const mongoose = require('mongoose');
const emojinator = require('emojinator');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
    id: {
        type: String,
        unique: true,
        index: true
    },
    id_str: {
        type: String,
        unique: true,
    },
    created_at: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    clean_text: {
        type: String,
    },
    text_object: {
        type: Object,
        default: {}
    },
    entities: {
        type: Object,
        default: {}
    },
    processing_version: {
        type: Number,
        default: 0,
        index: true
    },
    _user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true,
        index: true
    }
});

TweetSchema.pre('save', function (next) {
    if (!this.text_object) {
        this.text_object = emojinator.fullObject(this.text);
    }

    next();
});

module.exports = mongoose.model('tweet', TweetSchema);