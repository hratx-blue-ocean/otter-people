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
  groups: [String],
})

const User = mongoose.model('User', userSchema, 'users');

const eventSchema = Schema({
  name: String,
  location: String,
  date: Date,
  description: String,
  organizer: String,
  group_id: { type: Number, index: true }
});

const Event = mongoose.model('Event', eventSchema, 'events');

// model to get groups from database based on userEmail
const fetchGroups = (userEmail, callback) => {
  Group.find({ members: { $in: userEmail } }, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results)
    }
  });
}

// model to a single groups from database based on groupCode
const fetchGroup = (groupCode, callback) => {
  Group.find({ code: { $in: groupCode } }, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results)
    }
  });
}

const createGroup = (groupData, callback) => {
  const groupToAdd = new Group(groupData);
  Group.create(groupToAdd, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

//model to add user to a group
const addUserToGroup = (userId, groupCode, callback) => {
  Group.updateOne({ code: groupCode }, { $addToSet: { members: userId } }, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

//model to add group Name to a user
const addGroupNameToUser = (userId, groupName, callback) => {
  User.updateOne({ userId: userId }, { $addToSet: { groups: groupName } }, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// model to get group code from the database
const findGroupCode = (groupCode, callback) => {
  Group.exists({ code: groupCode }, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};


module.exports = {
  fetchGroups,
  createGroup,
  findGroupCode,
  addUserToGroup,
  addGroupNameToUser,
  fetchGroup
}

