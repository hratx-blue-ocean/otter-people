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
app.get('/groups', (req, res) => {
  console.log('reqparmas', req.query.userId);

  let userEmail = req.query.userId;
  db.fetchGroups(userEmail, (err, result) => {
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

  db.findGroupCode(groupCode, (err, result) => {
    if (err) {
      res.status(400).send('Code incorrect', err);
    } else {
      if (result !== null) {
        // DO PUT REQUEST! - add to groups - DO we need to add group to user?
        db.addUserToGroup(userId, groupCode, (err, result) => {
          if (err) {
            res.status(500).send('cannot add to group');
          } else {
            console.log("This is the result: ", result);
            db.addGroupNameToUser(userId, result.n, (err, data) => {
              if (err) {
                res.status(500).send('cannot add group to user', err);
              } else {
                res.status(200).send('Successfully added user to group and vice versa');
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
})

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Listening to port ${port}`);
});