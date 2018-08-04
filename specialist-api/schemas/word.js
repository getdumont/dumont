const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new Schema({
    words: [{
        type: String
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    to_tweet: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    by: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('word', WordSchema);