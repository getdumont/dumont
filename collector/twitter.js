const client = require('./client');
// const Appa = require('appa');

// class TwitterAppa extends Appa {
//     constructor() {
//         this.entities = {
//             'Tweet': TweetSchema,
//             'User': UserSchema,
//         }
//     }
// }

client.getTweets({
    'track': 'triste',
    'language': 'pt'
}, event => {
    console.log(event);
});

setTimeout(() => {
    process.exit(0);
}, 2000);