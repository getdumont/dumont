
const Promise = require('bluebird');
const twitter = require('./client');
const { User, Tweet } = require('../schema');

const LIMIT = process.env.COLLECTOR_LIMIT;
const WORDS = [
    'triste',
    'chateado',
    'deprimido',
    'ansioso',
    'estressado',
    'stress',
    'depre',
    'mal',
    'infelizmente',
    'merda',
];

let totalTweets = 0;
let tasks = 0;
let tasksDone = 0;

// Process data after stream ends
const processData = ({ tweetsPromise, userPromise }) => {
    return Promise.all([
        tweetsPromise, userPromise
    ]).then(([tweetsData, userData]) => {
        const user = new User(userData);

        return user.save().then(({_id}) => {
            return Promise.map(tweetsData, (tweetData) => {
                tweetData._user = _id;
                totalTweets = totalTweets + 1;
                const tweet = new Tweet(tweetData);
                return tweet.save();
            }, { concurrency: 10 });
        });
    })
};

module.exports = () => new Promise((resolve, reject) => {
    const stream = twitter.tweets.stream(WORDS.join(','));
    stream.on('tweet', (tweet) => {
        const { id, screen_name } = tweet.user;
        const user = { id, screen_name };

        tasks = tasks + 1;

        if (tasks >= LIMIT) {
            stream.stop();
        }

        processData({
            tweetsPromise: twitter.tweets.byUser(user),
            userPromise: twitter.getUser(user)
        }).then((tweets) => {
            tasksDone = tasksDone + 1;
            tasks = tasks - 1;

            if (tasks == 0 && tasksDone == LIMIT) {
                return resolve({
                    tweetsProcessed: totalTweets,
                    usersSaved: LIMIT
                });
            }
        }).catch(reject);
    });
});
