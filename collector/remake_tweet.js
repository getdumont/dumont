const fs = require('fs');
const { List } = require('../specialist-api/schemas');

fs.readFile('/Users/guidiego/Downloads/returnzero.csv', 'utf8', (err, buffer) => {
    if (err) {
        console.log(err);
        return;
    }

    list = new List({
        tweets: buffer.split('\n').map((v) => v.replace(/\r/, ''))
    })

    list.save().then(() => {
        process.exit(0)
    });
});

