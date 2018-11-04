const mongoose = require('mongoose');
const Promise = require('bluebird');

const mongoRetryTime = process.env.MONGO_RETRY_TIME || 10000
const mongoRetryLimit = process.env.MONGO_RETRY_LIMIT || 3
const mongoPrefix = process.env.MONGO_SRV ? '+srv' : '';
const mongoPort = process.env.MONGO_PORT ? `:${process.env.MONGO_PORT}` : '';
const mongoUser = process.env.MONGO_USER && process.env.MONGO_PASS ?
  `${process.env.MONGO_USER}:${process.env.MONGO_PASS}@` : '';

const dbURI = `mongodb${mongoPrefix}://${mongoUser}${process.env.MONGO_URI}${mongoPort}/${process.env.MONGO_DB}`;

let connectionRetries = 0;

mongoose.Promise = Promise;

const connectOnDb = () => {
  mongoose.connect(dbURI, { useNewUrlParser: true, server:{ auto_reconnect:true }});
}

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
  mongoose.disconnect();
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
  if (connectionRetries <= mongoRetryLimit) {
    connectionRetries = connectionRetries + 1;
    setTimeout(connectOnDb, mongoRetryTime)
  }
});

mongoose.connection.on('open', function () {
  console.log('Mongoose default connection is open');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

connectOnDb();
exports.User = require('./user');
exports.Tweet = require('./tweet');