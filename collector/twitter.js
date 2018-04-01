const twitter = require('./client');
const Tweet = require('./schema/tweet');
const User = require('./schema/user');
const Appa = require('./appa');

const concurrency = 10;
const WORDS = [
    'triste',
    'bad',
    'sad'
]

const appa = new Appa();
appa.registerEntity('Tweet', Tweet);
appa.registerEntity('User', User);

const registerTweet = tweet => {
    appa.Tweet.send(tweet);
    return twitter.getUser(tweet.user.id, tweet.user.screen_name)
}

twitter
    .getTweets(WORDS.reduce((a, c) => `${a} OR ${c}`))
    .map(registerTweet, { concurrency })
    .map(appa.User.send, { concurrency })
    .catch(e => {
        console.log(e);
    })
