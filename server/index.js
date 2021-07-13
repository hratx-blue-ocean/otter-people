const express = require('express');
const path = require('path');
const db = require('../database');
const port = 3001;

const app = express();

app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());

app.post('/login', (req, res) => {
  db.findOne({ "email": req.body.username }).lean()
    .then((response) => {
      console.log(response);
      //if response.pin === password ...
      res.status(200).send('You did it!!!')
    })
    .catch((err) => {
      res.status(400).send(err);
    })
})

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Listening to port ${port}`);
});