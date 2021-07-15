const express = require('express');
const path = require('path');
const db = require('../database');
const cors = require('cors');
const port = 3001;

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());

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