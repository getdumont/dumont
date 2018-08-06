const list = require('express').Router();
const { handleRes, auth } = require('../utils.js')
const { List } = require('../schemas');

list.get('/tweet', auth, (req, res) => {
    const tweetPromise = List.getTweet(req.specialist.analyzing);
    handleRes(res, tweetPromise);
});

list.post('/update', auth, (req, res) => {
    const changePromise = List.checkAndUpdate(req.specialist);
    handleRes(res, changePromise);
});

module.exports = list;