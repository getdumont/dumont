const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpecialistSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    professional_cred: {
        type: String,
    },
    analyzing: {
        index: { type: Number },
        list_id: { type: mongoose.SchemaTypes.ObjectId }
    },
    is_admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('specialist', SpecialistSchema);