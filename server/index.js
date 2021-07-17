const express = require('express');
const path = require('path');
// const db = require('../database');
const axios = require('axios');
var qs = require('qs');
require('dotenv').config()
const port = 3001;

const app = express();

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
    data : data
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
})

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
})

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Listening to port ${port}`);
});