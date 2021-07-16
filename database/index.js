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
  groupId: Number,
  description: String,
  code: String,
  photo: String,
  members: [String],
});

const Group = mongoose.model('Group', groupSchema, 'groups');
Counter.findOne({ _id: "groupId" }, (err, counter) => {
  if (err) {
    console.log("Error finding counter: ", err);
  } else {
    if (counter === null) {
      Counter.create({ _id: "groupId", sequence_value: 0 });
    } else {
      //do nothing
    }
  }

});

db.users.create({
  email: "test@test.com",
  userId: 1,
  avatar: "",
  pin: 1234,
  firstName: "testFirstName",
  lastName: "testLastName",
  city: "Houston",
  state: "TX",
  calculated_geolocation: [{}],
  groups: [1],
})




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
  groups: [String],
})

const User = mongoose.model('User', userSchema, 'users');

const eventSchema = Schema({
  name: String,
  location: String,
  date: Date,
  description: String,
  organizer: String,
  groupId: { type: Number, index: true },
  attending: [Number]
});

const Event = mongoose.model('Event', eventSchema, 'events');

//Add event to db for specific group
const createEvent = (event, callback) => {
  //check if event already exists first, then create event if doesn't exist
  Event.findOne({ name: event.name, groupId: event.groupId }, (err, data) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      //No existing event name within this group, so create new event for group
      if (data === null) {
        Event.create({
          name: event.name,
          location: event.location,
          date: event.date,
          description: event.description,
          organizer: event.organizer,
          groupId: event.groupId,
        }, (err, user) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, user);
          }
        });
      } else {
        callback(null, { error: 'Event Already Exists' })
      }
    }
  })
}

/* signIn method overview:
Find a user given an email
If given email matches a user in database
  if passwords match: send back all of that user's data
if either username (email) don't exist in db, or password doesn't match
  error or false
*/
const signIn = (username, password, callback) => { //callback will be (req, res) coming in from server
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

const signUp = (userData, callback) => {
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
// model to get groups from database based on userEmail
const fetchGroups = (userId, callback) => {
  Group.find({ members: { $in: userId } }, (err, results) => {
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
  getNextSequenceValue("groupId")
    //response is the group number
    .then((response) => {
      groupData.groupId = response.sequence_value;
      const groupToAdd = new Group(groupData);
      Group.create(groupToAdd, (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    })

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
const addGroupNameToUser = (userId, groupId, callback) => {
  User.findOneAndUpdate({ userId: userId }, { $addToSet: { groups: groupId } }, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// model to get group code from the database
const findGroupCode = (groupCode, callback) => {
  Group.findOne({ code: groupCode }, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const fetchEvents = (groupId, callback) => {
  Event.find({ groupId: groupId }, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      console.log('event query results');
      callback(null, results)
    }
  });
}

const updateAttending = (userId, eventName, callback) => {
  Event.findOneAndUpdate({ name: eventName }, { $addToSet: { attending: userId } }, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

const checkAttending = (userId, eventName, callback) => {
  Event.exists({ name: eventName, attending: { $in: [userId] } }, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  })
}

module.exports = {
  fetchGroups,
  createGroup,
  findGroupCode,
  addUserToGroup,
  addGroupNameToUser,
  fetchGroup,
  signIn,
  signUp,
  createEvent,
  fetchEvents,
  updateAttending,
  checkAttending
}

