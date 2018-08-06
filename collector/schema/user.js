const mongoose = require('mongoose');
const emojinator = require('emojinator');
const Schema = mongoose.Schema;
const { sendTweetToSQS } = require('../aws');

const sendMessage = sendTweetToSQS('users');
const baseString = {
    type: String,
    required: true,
};

const baseNumber = {
    type: Number,
    default: 0,
};
const UserSchema = new Schema({
    id: {
        type: String,
        unique: true,
        index: true
    },
    id_str: {
        type: String,
        unique: true,
    },
    protected: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        required: true,
    },
    description_object: {
        type: Object,
    },
    processing_version: {
        ...baseNumber,
        index: true,
    },
    description: {
        type: String,
        default: '',
    },
    screen_name: baseString,
    followers_count: baseNumber,
    friends_count: baseNumber,
    favourites_count: baseNumber,
    profile_text_color: baseString,
    profile_link_color: baseString,
    profile_sidebar_border_color: baseString,
    profile_sidebar_fill_color: baseString
});

UserSchema.pre('save', function (next) {
    if (this.description !== '') {
        this.description_object = emojinator.fullObject(this.description);
    }

    next();
});

UserSchema.post('save', function (doc, next) {
    if (this.description_object) {
        return next();
    }

    sendMessage(doc._id)
        .then(() => next())
        .catch(next);
});

module.exports = mongoose.model('user', UserSchema);