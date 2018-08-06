const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const redis = require('redis');
const { Specialist } = require('./schemas');

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
})

const generateToken = (specialist) => jwt.sign({
    data: { name: specialist.name }
}, process.env.SPECIALIST_API_TOKEN_SECRET);

exports.session = {
    create: (specialist) => {
        const token = generateToken(specialist);
        client.set(token, specialist._id);
        return Promise.resolve(token);
    },
    verify: (token) => new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SPECIALIST_API_TOKEN_SECRET, (err) => {
            if (err) {
                return reject(err);
            }

            client.get(token, (err, reply) => {
                if (!reply) {
                    err = "Key not in redis";
                }

                if (err) {
                    return reject(err);
                }

                return resolve(reply);
            });
        });
    }),
    delete: (token) => {
        client.del(token);
        return Promise.resolve({ ok: true });
    }
}

exports.handleRes = (res, promise) => {
    console.log('handle res');
    promise.then((body) => {
        console.log(body);
        res.status(200).json(body);
    }).catch((error) => {
        console.log(error);
        res.status(500).json({ error })
    });
}

exports.auth = (req, res, next) => {
    const token = req.headers['auth-token'];
    exports.session.verify(token).then((_id) => {
        Specialist.findOne({ _id }).then((specialist) => {
            req.specialist = specialist;
            req.token = token;
            next();
        });
    }).catch(() => {
        res.status(402).json({ message: 'Now Allowed' });
    })
}