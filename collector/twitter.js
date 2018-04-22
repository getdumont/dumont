
const twitter = require('./client');
const collector = require('appajs').Collector('./appa.config.yml');

// collector.users.addSchema(require('./schema/user'));
collector.tweets.addSchema(require('./schema/tweet'));

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