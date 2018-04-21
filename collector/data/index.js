const collector = require('appa').Collector('/appa.config.yml');

collector.users.addSchema(require('./user'));
collector.tweets.addSchema(require('./tweet'));

module.exports = collector;