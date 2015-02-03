
var AWS  = require('aws-sdk');

module.exports = function (opts) {
  var api = new AWS.EC2(opts);

  exports.get = {
   hosts: getInstances
  };

  function getInstances (filter, cb) {
    
    // dynamic cb shizzle 
    if (arguments.length === 1) cb = filter; filter = {};
    
    api.describeInstances(filter, function (err, data) {
      if (err) return cb(err);
      var list = [];
      // Dear AWS, your returned data structures are the worst.
      data.Reservations.map( function (i) { i.Instances.map(function (x) { list.push(x); }); });
      cb(undefined,list);
    });
  }
}
