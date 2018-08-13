const specialist = require('express').Router();
const crypto = require('crypto');
const { handleRes, session, auth } = require('../utils.js')
const { Specialist } = require('../schemas');

const md5 = (pass) => {
    return crypto.createHash('md5').update(pass).digest("hex");
}

specialist.post('/session', (req, res) => {
    const notAllowed = () => {
        res.status(402).json({ message: 'Not Allowed' })
    };

    Specialist.findOne({
        email: req.body.email,
        password: md5(req.body.password),
    }).then((user) => {
        if (!user) {
            return notAllowed();
        }

        session.create(user).then((token) => {
            res.status(200).json({ token });
        });
    }).catch(notAllowed);
});

specialist.delete('/session', auth, (req, res) => {
    handleRes(res, session.delete(req.token));
});

specialist.get('/session', auth, (req, res) => {
    const { email, name } = req.specialist;
    handleRes(res, Promise.resolve({ email, name }));
});

specialist.get('/:id', auth, (req, res) => {
    handleRes(res, Specialist.findOne({ _id: req.params.id }));
});

module.exports = specialist;