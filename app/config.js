var Mongoose = require('mongoose');
var path = require('path');

Mongoose.connect('mongodb://localhost:27017/shortlydb');

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
  username: String,
  password: String,
  timestamps: {type: Date, default: Date.now}
});

module.exports = db;

// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: process.env.siteName || '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });
