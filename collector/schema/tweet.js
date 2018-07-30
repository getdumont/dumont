const mongoose = require('mongoose');
const emojinator = require('emojinator')
const Schema = mongoose.Schema;
const { sendTweetToSQS } = require('../aws');

const sendMessage = sendTweetToSQS('tweet');

const TweetSchema = new Schema({
    id: {
        type: String,
        unique: true,
        index: true
    },
    id_str: {
        type: String,
        unique: true,
        index: true
    },
    created_at: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    textObject: {
        type: Object,
        default: {}
    },
    entities: {
        type: Object,
        default: {}
    },
    _user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true,
        index: true
    }
});

TweetSchema.pre('save', function (next) {
    this.textObject = emojinator.fullObject(this.text);
    next();
});

TweetSchema.post('save', function (doc, next) {
    sendMessage(doc._id)
        .then(() => next())
        .catch(next);
});

module.exports = mongoose.model('tweet', TweetSchema);