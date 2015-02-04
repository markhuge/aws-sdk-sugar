#  Maybe don't use this yet.

I just noticed a big spike in downloads on npm. I'm hoping this is mirrors/bots and not real people.

This package isn't even *remotely* stable right now.

# Abstract

This module is a collection of method wrappers to (hopefully) lower the barrier to entry for interacting with AWS services.

My uses cases are primarily focused on EC2/ELB automation.

I'm happy to accept PRs for additional services.

# Install

`npm install aws-sdk-sugar`

# Usage

```JS
var elb = require('aws-sdk-sugar').elb;

//log a list of instances in the 'prod-web' ELB
elb.list('prod-web',console.log);

//add an instance to prod-web
elb.add('prod-web','ia232342324', someCallback);

//add multiple instances to prod-web
elb.add('prod-web',['ia22222','ia44444444','ia3873737373'], someCallback);
```
