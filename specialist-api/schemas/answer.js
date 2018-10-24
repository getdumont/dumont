const mongoose = require('mongoose');
const asks = require('../questions.json');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    question: [{
        question_index: {
            type: Number,
            required: true,
        },
        impact: {
            type: Number,
            min: 1,
            max: 4,
            required: true,
        },
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

module.exports = mongoose.model('answer', AnswerSchema);