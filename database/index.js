const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbs = 'alumniMeetUp';

mongoose.connect(`mongodb://localhost/${dbs}`, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('Mongo connected!')
});

const groupSchema = Schema({
  name: { type: String, unique: true, index: true },
  description: String,
  code: String,
  photo: String,
  members: [String],
});

const Group = mongoose.model('Group', groupSchema, 'groups');

const userSchema = Schema({
  email: { type: String, unique: true, index: true },
  avatar: String,
  pin: Number,
  firstName: String,
  lastName: String,
  city: String,
  state: String,
  calculated_geolocation: [Object],
  groups: [Number],
})

const User = mongoose.model('User', userSchema, 'users');

const eventSchema = Schema({
  name: String,
  location: String,
  date: Date,
  description: String,
  organizer: String,
  group_id: Number,
});

const Event = mongoose.model('Event', eventSchema, 'events');

module.exports = {

}