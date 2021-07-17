const express = require('express');
const path = require('path');
const axios = require('axios');
var qs = require('qs');
require('dotenv').config()
const cors = require('cors');
const db = require('../database');
const port = 3001;

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());

// get request for event recommendations
// input for API call needs to be:
// latitude, longitude, radius, activity
// latitude: 40.41436995
// longitude: 3.69170868
// radius: 1
// activity: shopping
// example: https://test.api.amadeus.com/v1/shopping/activities?longitude=-3.69170868&latitude=-3.69170868&radius=1
app.get('/recommendEvents', (req, res) => {
  // GET TEMPORARY AMADEUS AUTH TOKEN
  let data = qs.stringify({
    'grant_type': 'client_credentials',
    'client_id': process.env.AMADEUS_KEY,
    'client_secret': process.env.AMADEUS_SEC
  });
  let config = {
    method: 'post',
    url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };
  axios(config)
    .then((response) => {
      const amadeusToken = response.data.access_token;

      // AMADEUS CALL TO GET EVENT RECOMMENDATIONS
      // const { activity, longitude, latitude } = req.body;
      // THESE ARE HARD CODED BUT NEED TO COME FROM THE FRONT END
      // SEND ACTIVITY FROM THE DROPDOWN MENU
      // INSTEAD OF LAT AND LONG, SEND THE CITY THROUGH THE REQUEST AND CONVERT TO LAT/LONG WITH RADAR.IO
      // THE ENDPOINT IS BELOW
      const activity = 'shopping'
      const latitude = 37.76992;
      const longitude = -122.466354;

      axios({
        method: 'get',
        url: `https://test.api.amadeus.com/v1/${activity}/activities`,
        headers: {
          authorization: `Bearer ${amadeusToken}`,
        },
        params: {
          latitude,
          longitude,
          radius: 1,
        },
      })
        .then((recommendations) => {
          // 'events' WILL BE THE RETURN VALUE FROM THE ENDPOINT
          // PICTURES ARE INCLUDED - maybe don't need flickr API
          const events = [];
          // FOR EACH RECOMMENDATION SENT BACK FROM AMADEUS:
          // TODO: GET THE ACTIVITY CATEGORY FROM RESPONSE
          recommendations.data.data.forEach((recommendation) => {
            events.push({
              id: recommendation.id,
              name: recommendation.name,
              shortDescription: recommendation.shortDescription,
              geocode: `${recommendation.geoCode.latitude}.${recommendation.geoCode.longitude}`,
              imageURL: recommendation.pictures[0],
            })
            // IN CASE WE NEED TO USE FLICKR FOR SOME REASON IN THE FUTURE:
            // build a url from flickr response
            // => https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
            // axios request
            // method: flickr.photos.search
            // api_key: process.env.FLICKR_KEY
            // text: recommendations[x].name
            // per_page: 1
            // let getFlickrPhoto = {
            //   method: 'get',
            //   url: 'https://www.flickr.com/services/rest/',
            //   params: {
            //     method: 'flickr.photos.search',
            //     api_key: process.env.FLICKR_KEY,
            //     text: recommendation.name,
            //     per_page: 1,
            //   }
            // };
          })
          res.send(events);
        })
    })
    .catch((error) => {
      console.log(error);
    });
});

// input: param string with lat and lon
// headers: Radar.io auth token
//
// output: address
app.get('/geocodeToAddress', (req, res) => {
  const { latlong } = req.body;

  axios({
    method: 'get',
    url: 'https://api.radar.io/v1/geocode/reverse',
    headers: {
      Authorization: process.env.RADAR_KEY
    },
    params: {
      latlong
    },
  })
    .then((address) => {
      // address.addresses.formattedAddress is the full address
    })
});

// CONVERT CITY NAME TO GEOCODE
// NEED A CITY NAME PASSED IN AS 'cityName' IN 'request.body'
// input: param string with city name
// headers: Radar.io auth token
//
// output:
app.get('/cityNameToGeocode', (req, res) => {
  const convertCityToGeocode = {
    method: 'get',
    url: 'https://api.radar.io/v1/search/autocomplete',
    headers: {
      'Authorization': process.env.RADAR_KEY,
    },
    params: {
      query: req.body.cityName,
    }
  };

  axios(convertCityToGeocode)
    .then((geocodeResponse) => {
      const coords = geocodeResponse.addresses[0];
      const cityCoords = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      };
      res.send(JSON.stringify(cityCoords));
    })
    .catch(function (error) {
      console.log(error.data);
    });
});

// group routes
// NEED TO HOOK UP USEREMAIL

app.get('/events', (req, res) => {
  const groupId = req.query.groupId;
  db.fetchEvents(groupId, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      console.log('event results', result)
      res.status(200).send(result);
    }
  })
});

app.get('/groups', (req, res) => {
  // console.log('reqparmas', req.query.userId);
  let userId = req.query.userId;
  db.fetchGroups(userId, (err, result) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send(result);
    }
  })
});

app.get('/groups/getOne', (req, res) => {
  let groupCode = req.query.groupCode;
  db.fetchGroup(groupCode, (err, result) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send(result);
    }
  })
});

app.get('/groups/code', (req, res) => {
  let groupCode = req.query.groupCode;
  let userId = req.query.userId;
  let city = req.query.city;

  db.findGroupCode(groupCode, (err, result) => {
    if (err) {
      res.status(400).send('Code incorrect', err);
    } else {
      if (result !== null) {
        // DO PUT REQUEST! - add to groups - DO we need to add group to user?
        db.addUserToGroup(userId, groupCode, city, (err, result) => {
          if (err) {
            res.status(500).send('cannot add to group');
          } else {
            console.log("This is the result: ", group);
            db.addGroupNameToUser(userId, result.groupId, (err, user) => {
              if (err) {
                res.status(500).send('cannot add group to user', err);
              } else {
                res.status(200).send(group);
              }
            });
          }
        });
      } else {
        res.status(400).send('Code incorrect', err);
      }
    }
  })
});

app.get('/event/attending/check', (req, res) => {
  console.log('check whether attending');
  let eventName = req.body.eventName;
  let userId = req.body.userId;

  db.checkAttending(userId, eventName, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      if (data.error) {
        res.status(200).send({ error: data.error })
      } else {
        res.status(200).send(data);
      }
    }
  })
})

app.post('/groups', (req, res) => {
  db.createGroup(req.body, (err, results) => {
    if (err) {
      res.status(400).send(err)
    } else {
      console.log(results);
      res.status(201).send();
    }
  })
});


app.post('/login', (req, res) => {
  console.log('user data: ', req.body.email, ' ', req.body.password)
  console.log('reached the endpoint');
  db.signIn(req.body.email, req.body.password, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      if (data.failedLogin) {
        res.status(200).send({ error: 'incorrect email or password' });
      } else {
        res.status(200).send(data);
      }
    }

  });
});

app.post('/sign', (req, res) => {
  console.log('signup reached');
  db.signUp(req.body, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      if (data.error) {
        res.status(200).send({ error: data.error })
      } else {
        res.status(200).send(data);
      }
    }
  })
});

app.post('/members/info', (req, res) => {
  db.getUserInfo(req.body.members, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      if (data !== null) {
        res.status(200).send(data);
      } else {
        res.status(200).send({ error: 'No user data found' });
      }
    }
  });
});

app.post('/event', (req, res) => {
  console.log('server index: /event reached');
  db.createEvent(req.body, (err, data) => {
    if (err) {
      console.log('failed to add event');
      res.status(400).send(err);
    } else {
      if (data.error) {
        res.status(200).send({ error: data.error })
      } else {
        res.status(200).send(data);
      }
    }
  })
});

app.put('/event/attending', (req, res) => {
  console.log('update attending');
  let eventName = req.body.eventName;
  let userId = req.body.userId;

  db.updateAttending(userId, eventName, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      if (data.error) {
        res.status(200).send({ error: data.error })
      } else {
        res.status(200).send(data);
      }
    }
  })
})

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Listening to port ${port}`);
});