const Twitter = require('twitter');
const env = require('node-env-file');

env(`${__dirname}/.env`);

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const registerError = kind => error => {
    console.log(`[${kind}] > ${error}`);
}

module.exports = {
    getTweets: (track, callback) => {
        client.stream('statuses/filter', track, function(stream) {
            stream.on('data', callback);
            stream.on('error', registerError('tweet'));
        });
    },
    getUser: (track, callback) => {
        client.stream('user', { track }, function(stream) {
            stream.on('data', callback);
            stream.on('error', registerError('user'));
            setTimeout(() => stream.destroy(), 5000);
        });
    }
};