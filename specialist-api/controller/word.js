const Promise = require('bluebird');
const word = require('express').Router();
const { handleRes, auth } = require('../utils.js')
const { Word } = require('../schemas');

word.post('/', auth, (req, res) => {
    const doc = new Word({
        ...req.body,
        by: req.specialist._id
    });

    handleRes(res, doc.save());
});

module.exports = word;
