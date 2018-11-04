const twitterCollector = require('./twitter');
const ms = require('ms');

let repetitionTimes = 0;
let timeout = null;

const collectTweets = () => {
    setTimeout(() => {
        twitterCollector().then((data) => {
            console.log(JSON.stringify(data, null, 4));
        }).catch((error) => {
            console.log(error);
        }).then(() => {
            if (process.env.REPETITION_TIMES > repetitionTimes) {
                clearInterval(timeout);
                process.end(0);
            } else {
                repetitionTimes += 1;
                collectTweets();
            }
        })
    }, ms(process.env.REPETITION_INTERVAL));
}

timeout = collectTweets();
