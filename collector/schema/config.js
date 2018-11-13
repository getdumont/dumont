const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfigSchema = new Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: Schema.Types.Mixed,
        required: true
    },
    extra: {
        type: Object,
        default: {}
    }
});

module.exports = mongoose.model('config', ConfigSchema);
