if (process.env.DEVELOPMENT) {
    require('node-env-file')(`${__dirname}/.env`);
}

const Promise = require('bluebird');
const twitter = require('./client');
const { User, Tweet } = require('./schema');

const LIMIT = process.env.COLLECTOR_LIMIT;
const WORDS = [
    'triste',
    'chateado',
    'mal',
    'infelizmente',
    'merda',
];

let tasks = 0;
let tasksDone = 0;
const stream = twitter.tweets.stream(WORDS.join(','))

// Process data after stream ends
const processData = ({ tweetsPromise, userPromise }) => {
    return Promise.all([
        tweetsPromise, userPromise
    ]).then(([tweetsData, userData]) => {
        const user = new User(userData);

        return user.save().then(({_id}) => {
            return Promise.map(tweetsData, (tweetData) => {
                tweetData._user = _id;
                const tweet = new Tweet(tweetData);
                return tweet.save();
            });
        });
    })
};

stream.on('tweet', (tweet) => {
    const { id, screen_name } = tweet.user;
    const user = { id, screen_name };

    tasks = tasks + 1;

    processData({
        tweetsPromise: twitter.tweets.byUser(user),
        userPromise: twitter.getUser(user)
    }).then(() => {
        tasksDone = tasksDone + 1;
        tasks = tasks - 1;

        if (tasks == 0 && tasksDone == LIMIT) {
            process.exit(0);
        }
    }).catch((err) => {
        console.log(err);
    });

    if (tasks >= LIMIT) {
        stream.stop();
    }
});

