var db = require('../config');
var Mongoose = require('mongoose');
var crypto = require('crypto');


db.UrlSchema.method('setCode', function() {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.get('url'));
  this.set('code', shasum.digest('hex').slice(0,5));
});


var Link = Mongoose.model('Link', db.UrlSchema);

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

module.exports = Link;
