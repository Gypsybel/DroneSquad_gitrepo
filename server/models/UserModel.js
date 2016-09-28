var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  alias: String,
  user_type: {type: String, default: "pilot"},
  email: String,
  password: String,
  image_url: String,
  bio: String,
  created_at: Date

});
mongoose.model('User', UserSchema);

var GroupSchema = new Schema({
  name: String,
  description: String,
  city: String,
  state: String,
  instagram_token: {type:String, default: "2227039481.eec5c8b.bcc5f8c4c8ff4e3894df7cf3bce973c7"},
  created_at: Date,
  image_url: {type: String, default: "https://d30y9cdsu7xlg0.cloudfront.net/png/103844-200.png"},
  _users: [{type: Schema.Types.ObjectId, ref: 'User'}],
  _flying_location: {type: Schema.Types.ObjectId, ref: 'Location'},
  _meetups: [{type: Schema.Types.ObjectId, ref: 'Event'}],
  _organizers: [{type: Schema.Types.ObjectId, ref: 'User'}],
})
mongoose.model('Group', GroupSchema);

var LocationSchema = new Schema({
  label: String,
  coordinate_x: Number,
  coordinate_y: Number,
  created_at: Date
})
mongoose.model('Location', LocationSchema);

var MeetupSchema = new Schema({
  name: String,
  created_at: Date,
  date: Date,
  _organizers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  _attendees: [{type: Schema.Types.ObjectId, ref: 'User'}],
  _location: {type: Schema.Types.ObjectId, ref: 'Location'},
  location: String,
  description: String
});
mongoose.model('Meetup', MeetupSchema)
