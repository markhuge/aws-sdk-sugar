module.exports = function (config) {
  return {
    elb: require('./lib/elb')(config),
    ec2: require('./lib/ec2')(config)
  }
};
