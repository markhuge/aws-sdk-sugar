var AWS  = require('aws-sdk');

module.exports = function (opts) {    
  var api = new AWS.ELB(opts);
  return {
    // Add instance(s) to ELB
    add: function (elbName, instanceId, cb) {
      // support adding array of instances at once
      var instance = mapInstances(instanceId),
        params   = { Instances: instance, LoadBalancerName: elbName };
      api.registerInstancesWithLoadBalancer(params, cb);
    },

    // Remove instance(s) to ELB
    remove: function (elbName, instanceId, cb) {
      // support removing array of instances at once
      var instance = mapInstances(instanceId),
        params   = { Instances: instance, LoadBalancerName: elbName };
      api.deregisterInstancesFromLoadBalancer(params, cb);
    },

    // List instances in ELB
    list: function (elbName, cb) {
      query(elbName, function (err, data) {
        if (err) return cb(err);
        var result = [];
        data.Instances.map(function (item) { result.push(item.InstanceId); });
        cb(undefined, result);
      });
    },

    // Get info for ELB
    info: query
  };

  function query (elbName, cb) {
    var params = { LoadBalancerNames: [ elbName ] };
    api.describeLoadBalancers(params, function (err, data) {
      if (err) return cb(err);
      cb(undefined,data.LoadBalancerDescriptions[0]);
    });
  }


  function mapInstances (ids) {
    var result = [];
    if (ids instanceof Array) ids.map(function (instance) { result.push({ InstanceId: instance }); });
    else result.push({InstanceId: ids});
    return result;
  }
};


