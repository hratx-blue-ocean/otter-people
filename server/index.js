const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('../database');
const port = 3001;

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/events', (req, res) => {
  const groupId = req.query.groupId;
  db.fetchEvents(groupId, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  })
});

app.get('/groups', (req, res) => {
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
        db.addUserToGroup(userId, groupCode, city, (err, result) => {
          if (err) {
            res.status(500).send('cannot add to group');
          } else {
            db.addGroupNameToUser(userId, result.groupId, (err, user) => {
              if (err) {
                res.status(500).send('cannot add group to user', err);
              } else {
                res.status(200).send(groupCode);
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
      res.status(201).send();
    }
  })
});


app.post('/login', (req, res) => {
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