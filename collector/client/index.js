const request = require('request');
const Promise = require('bluebird');
const env = require('node-env-file');

env(`${__dirname}/.env`);

class Twitter {
    constructor() {
        this.url = 'https://api.twitter.com/1.1'
        this.oauth = {
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            token: process.env.TWITTER_ACCESS_TOKEN_KEY,
            token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        }
    }

    get(path, qs) {
        const url = `${this.url}${path}.json`;
        const oauth = this.oauth;

        return new Promise((resolve, reject) => {
            request.get({ url, oauth, qs, json: true }, (e, r, data) => {
                if (e) return reject(e);
                return resolve(data);
            });
        });
    }

    getUser(user_id, screen_name) {
        const qs = { user_id, screen_name };
        return this.get('/users/show', qs);
    }

    getTweets(q) {
        return this.get('/search/tweets', { q, lang: 'pt' }).then(d => d.statuses);
    }
}

module.exports = new Twitter();