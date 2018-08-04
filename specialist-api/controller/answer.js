const Promise = require('bluebird');
const answer = require('express').Router();
const { handleRes, auth } = require('../utils.js')
const { Answer } = require('../schemas');

answer.get('/questions', auth, (req, res) => {
    handleRes(res, Promise.resolve(require('../questions.json')));
});

answer.post('/', auth, (req, res) => {
    const doc = new Answer({
        ...req.body,
        by: req.specialist._id
    });

    handleRes(res, doc.save());
});

module.exports = answer;