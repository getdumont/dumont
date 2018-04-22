
const twitter = require('./client');
const collector = require('appajs').Collector('./appa.config.yml');

collector.users.addSchema(require('./schema/user'));
collector.tweets.addSchema(require('./schema/tweet'));

const WORDS = [
    'triste',
    'bad',
    'sad'
]

let count = 0;
const checkAndStopProcess = () => {
    count++;
    if (count > 10) {
        process.exit();
    }
}

twitter.tweets.stream(WORDS.join(','), (tweet) => {
    const { id, screen_name } = tweet.user;
    const user = { id, screen_name };

    twitter.tweets.byUser(user, (err, tweets) => {
        if (err) {
            throw err;
        }

        collector.tweets.send(tweets);
    });

    twitter.getUser(user, (err, fullUser) => {
        if (err) {
            throw err;
        }

        collector.users.send(fullUser);
        checkAndStopProcess();
    });
});