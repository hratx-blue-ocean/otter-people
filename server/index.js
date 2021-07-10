const express = require('express');
const path = require('path');
const db = require('../database');
const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());

app.listen(port, (err) => {
  if(err) console.log(err);
  console.log(`Listening to port ${port}`);
});