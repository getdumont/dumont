
const twitter = require('./client');
const collector = require('./data');

const WORDS = [
    'triste',
    'bad',
    'sad'
]

twitter
    .getTweets(WORDS.reduce((a, c) => `${a} OR ${c}`))
    .then((data) => collector.tweets.send(data))
    .catch(e => {
        console.log(e);
    })