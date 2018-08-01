if (process.env.DEVELOPMENT == 'true') {
    require('node-env-file')(`.env`);
    process.env.FULL_DB_URI = `mongodb://${process.env.MONGO_URI}:27017/${process.env.MONGO_DB}`;
} else {
    require('node-env-file')(`.env-prod`);
    process.env.FULL_DB_URI =
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URI}/${process.env.MONGO_DB}`
}

const http = require('http');
const twitterCollector = require('./twitter');

http.createServer(function (req, res) {
    if (req.headers['token'] !== process.env.COLLECTOR_REQUEST_TOKEN) {
        res.writeHead(402, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error: 'Not Authorized' }, null, 4));
        return res.end();
    }

    twitterCollector().then((data) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(data, null, 4));
        return res.end();
    }).catch((error) => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error }, null, 4));
        return res.end();
    });
}).listen(process.env.COLLECTOR_API_PORT);