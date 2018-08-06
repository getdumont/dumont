const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    tweets: [{
        type: mongoose.SchemaTypes.ObjectId
    }],
    specialists_done: [{
        type: mongoose.SchemaTypes.ObjectId
    }]
});

module.exports = mongoose.model('list', ListSchema);