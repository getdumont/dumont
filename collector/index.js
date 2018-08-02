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
}).listen({
    port: 8080,
    host: '0.0.0.0'
}, () => {
    console.log('Server up on http://0.0.0.0:8080/')
});