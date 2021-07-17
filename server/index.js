const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('../database');
const port = 3001;

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());

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
  console.log('group code: ', groupCode);
  db.findGroupCode(groupCode, (err, result) => {
    if (err) {
      res.status(400).send('Code incorrect', err);
    } else {
      if (result !== null) {
        // DO PUT REQUEST! - add to groups - DO we need to add group to user?
        db.addUserToGroup(userId, groupCode, (err, group) => {
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