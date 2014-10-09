var Mongoose = require('mongoose');
var path = require('path');


var mongooseUri = process.env.dbURI || 'mongodb://localhost:27017/shortlydb';
Mongoose.connect(mongooseUri);

var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('connection opened to shortlydb. happy shortening');
});

var Schema = Mongoose.Schema;

db.UrlSchema = new Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: {type: Number, default: 0},
  timestamps: {type: Date, default: Date.now}
});

db.UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  timestamps: {type: Date, default: Date.now}
});

module.exports = db;
