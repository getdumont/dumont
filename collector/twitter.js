const Promise = require('bluebird');
const twitter = require('./client');
const collector = require('appajs').Collector('./appa.config.yml');

collector.users.addSchema(require('./schema/user'));
collector.tweets.addSchema(require('./schema/tweet'));

const LIMIT = 1;
const WORDS = [
    'triste',
    'bad',
    'sad'
];

let tasks = [];
const stream = twitter.tweets.stream(WORDS.join(','))

// Process data after stream ends
const startProcess = () => Promise.map(tasks, (task) => {
    return task.tweets.then((tweets) => {
        // Send tweets out of Collector
        collector.tweets.send(tweets);

        // Get user from tweet and send out of Collector
        return task.user.then((user) => {
            collector.users.send(user);
            return true
        });
    })
}, { concurrency: 20 });

stream.on('tweet', (tweet) => {
    const { id, screen_name } = tweet.user;
    const user = { id, screen_name };

    tasks.push({
        tweets: twitter.tweets.byUser(user),
        user: twitter.getUser(user)
    });

    if (tasks.length > LIMIT) {
        stream.stop();
        startProcess().then(() => {
            process.exit(0);
        });
    }
});

