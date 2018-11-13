const Twit = require('twit');
const Promise = require('bluebird');

const client = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const BRAZIL_LOCATION = '-73.9872354804, -33.7683777809, -34.7299934555, 5.24448639569';
const BRAZIL_LANG = 'pt';

const getFromAPI = (path, params) => new Promise((resolve, reject) => {
    client.get(path, params, (err, val) => {
        if (err) return reject(err);
        return resolve(val);
    });
});

module.exports = {
    _client: client,
    tweets: {
        stream: (track) => client.stream('statuses/filter', {
            track, location: BRAZIL_LOCATION, language: BRAZIL_LANG
        }),
        byUser: (user, extra = {}) => getFromAPI('statuses/user_timeline', {...user, ...extra, tweet_mode: 'extended', count: 200}),
        byId: (id) => getFromAPI('statuses/show', { id, tweet_mode: 'extended' })
    },
    users: {
        byObj: (user) => getFromAPI('users/show', user),
        byScreenName: (screen_name) => getFromAPI('users/lookup', { screen_name }),
    },
}
