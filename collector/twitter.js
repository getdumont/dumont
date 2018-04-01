const twitter = require('./client');
const Tweet = require('./schema/tweet');
const User = require('./schema/user');

const WORDS = [
    'triste',
    'bad',
    'sad'
]


twitter
    .getTweets(WORDS.reduce((a, c) => `${a} OR ${c}`))
    .map(tweet => {
        console.log(Tweet(tweet));
        return twitter.getUser(tweet.user.id, tweet.user.screen_name)
    })
    .map(user => {
        console.log(User(user));
    })
    .catch(e => {
        console.log(e);
    })
