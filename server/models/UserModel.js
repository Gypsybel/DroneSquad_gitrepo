var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  alias: String,
  user_type: {type: String, default: "pilot"},
  email: String,
  password: String,
  image_url: String,
  bio: String
},{timestamps:true});
mongoose.model('User', UserSchema);

var GroupSchema = new Schema({
  name: String,
  description: String,
  city: String,
  state: String,
  instagram_token: {type:String, default: "2227039481.eec5c8b.bcc5f8c4c8ff4e3894df7cf3bce973c7"},
  created_at: Date,
  image_url: {type: String, default: "https://d30y9cdsu7xlg0.cloudfront.net/png/103844-200.png"},
  _members: [{type: Schema.Types.ObjectId, ref: 'User'}],
  _flying_location: {type: Schema.Types.ObjectId, ref: 'Location'},
  _meetups: [{type: Schema.Types.ObjectId, ref: 'Event'}],
  _organizers: [{type: Schema.Types.ObjectId, ref: 'User'}],
},{timestamps:true})
mongoose.model('Group', GroupSchema);

var LocationSchema = new Schema({
  label: String,
  coordinate_x: Number,
  coordinate_y: Number
},{timestamps:true})
mongoose.model('Location', LocationSchema);

var MeetupSchema = new Schema({
  name: String,
  date: Date,
  _group: {type: Schema.Types.ObjectId, ref: 'Group'},
  _organizers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  _attendees: [{type: Schema.Types.ObjectId, ref: 'User'}],
  _location: {type: Schema.Types.ObjectId, ref: 'Location'},
  location: String,
  description: String
},{timestamps:true});
mongoose.model('Meetup', MeetupSchema)
