const Twit = require('twit');
const env = require('node-env-file');

env(`${__dirname}/.env`);

const client = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const BRAZIL_LOCATION = '-73.9872354804, -33.7683777809, -34.7299934555, 5.24448639569';
const BRAZIL_LANG = 'pt';

module.exports = {
    _client: client,
    tweets: {
        stream: (track, cb) => {
            const stream = client.stream('statuses/filter', {
                track, location: BRAZIL_LOCATION, language: BRAZIL_LANG
            });

            stream.on('tweet', cb);
        },
        byUser: (user, cb) => client.get('statuses/user_timeline', user, cb),
    },
    getUser: (user, cb) => client.get('users/show', user, cb),
}
