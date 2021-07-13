const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('../database');
const port = 3001;

console.log('test');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());

// group routes
app.get('/groups', (req, res) => {


  res.status(200).send('sucessful test');

});

app.listen(port, (err) => {
  if(err) console.log(err);
  console.log(`Listening to port ${port}`);
});