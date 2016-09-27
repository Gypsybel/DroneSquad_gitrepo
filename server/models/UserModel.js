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
  description: String,
  _users: [{type: Schema.Types.ObjectId, ref: 'User'}],
  _flying_location: {type: Schema.Types.ObjectId, ref: 'Location'},
  city: String,
  state: String,
  created_at: Date,
  _events: [{type: Schema.Types.ObjectId, ref: 'Event'}],
  _organizers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  image_url: String,
  instagram_token: String
})
mongoose.model('Group', GroupSchema);

var LocationSchema = new Schema({
  coordinate_x: Number,
  coordinate_y: Number,
  created_at: Date
})
mongoose.model('Location', LocationSchema);

var EventSchema = new Schema({
  created_at: Date,
  event_date: Date,
  _organizers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  _attendees: [{type: Schema.Types.ObjectId, ref: 'User'}],
  _location: {type: Schema.Types.ObjectId, ref: 'Location'},
  description: String
})
mongoose.model('Event', EventSchema)
