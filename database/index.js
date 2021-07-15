const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbs = 'alumniMeetUp';

mongoose.connect(`mongodb://localhost/${dbs}`, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('Mongo connected!')
});

const counterSchema = Schema({
  _id: String,
  sequence_value: Number,
})

const Counter = mongoose.model('Counter', counterSchema, 'counters');
Counter.findOne({ _id: "userId" }, (err, counter) => {
  if (err) {
    console.log("Error finding counter: ", err);
  } else {
    if (counter === null) {
      Counter.create({ _id: "userId", sequence_value: 0 });
    } else {
      //do nothing
    }
  }

});

const getNextSequenceValue = (sequenceName) => {
  return Counter.findOneAndUpdate({ _id: sequenceName }, { $inc: { sequence_value: 1 } });
}

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
  userId: Number,
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


/* signIn method overview:
Find a user given an email
If given email matches a user in database
  if passwords match: send back all of that user's data
if either username (email) don't exist in db, or password doesn't match
  error or false
*/
let signIn = (username, password, callback) => { //callback will be (req, res) coming in from server
  User.findOne({ email: username }, (err, user) => {
    if (err) {
      console.log(err);
      callback(err, null); //{failedUsername: true}
    } else {
      if (!user) {
        callback(null, { failedLogin: true })
      } else if (user.pin === Number(password)) {
        callback(null, user);
      } else {
        //if username is correct but passwords don't match...
        callback(null, { failedLogin: true })
      }
    }
  });
};

let signUp = (userData, callback) => {
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      //No existing user with this email, so create new user
      if (user === null) {
        getNextSequenceValue("userId")
          .then((response) => {
            User.create({
              email: userData.email,
              userId: response.sequence_value,
              pin: userData.password,
              firstName: userData.firstName,
              lastName: userData.lastName,
              city: userData.city,
              state: userData.stateName,
              groups: []
            }, (err, user) => {
              if (err) {
                callback(err, null);
              } else {
                callback(null, user);
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        callback(null, { error: 'User Already Exists' })
      }
    }
  })
}

//export methods that rely on the classes created (e.g. Group, User, Event)
module.exports = { signIn, signUp }

/* injecting fake user into db
use alumniMeetUp

db.users.insert({
  email: 'tom.m.riddle@voldemort.uk',
  avatar: 'Basilisk',
  pin: 1150,
  firstName: 'Thomas',
  lastName:  'Riddle',
  city: 'London',
  state: 'UK',
  calculated_geolocation: 'sewers at hogwarts',
  groups: [1,3,3,7],
});
*/