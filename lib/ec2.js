var AWS  = require('aws-sdk');

module.exports = function (opts) {
  var api = new AWS.EC2(opts);

  return {
   instances: getInstances,
   hosts    : getInstances
  };

  function getInstances (params, cb) {
    // dynamic cb shizzle 
    if (arguments.length === 1) cb = params; params = {};
    
    api.describeInstances(params, function (err, data) {
      if (err) return cb(err);
      var list = [];
      // Dear AWS, your returned data structures are the worst.
      data.Reservations.map( function (i) { i.Instances.map(function (x) { list.push(x); }); });
      
      // Dear god more maps - see: https://twitter.com/mwhuge/status/562764935898595329
      list.map(function (instance) { instance.Tags = WTFAmazon(instance.Tags); });
      cb(undefined,list);
    });
  }
};

// Convert AWW's batshit map arrays to an object
function WTFAmazon (array) {
  var result = {};
  array.map(function (item) { result[item.Key] = item.Value; });
  return result;
}
