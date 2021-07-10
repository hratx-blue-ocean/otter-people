const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbs = 'alumniMeetUp';

mongoose.connect(`mongodb://localhost/${dbs}`, {useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Mongo connected!')
});

const groupSchema = Schema({
  name: {type:String, unique:true, index:true},
  description:String,
  code:String,
  members: [
    String
  ]
});

const Group = mongoose.model('Group', groupSchema, 'groups' );

module.exports = {

}