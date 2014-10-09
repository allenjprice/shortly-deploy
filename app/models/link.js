var db = require('../config');
var Mongoose = require('mongoose');
var crypto = require('crypto');


db.UrlSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0,5);
  next();
});

var Link = Mongoose.model('Link', db.UrlSchema);

module.exports = Link;
