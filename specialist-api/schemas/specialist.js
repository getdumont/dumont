const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { createPasswordHash } = require('../utils');

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


SpecialistSchema.pre('save', function (next) {
    this.password = createPasswordHash(this.password);
    next();
});

module.exports = mongoose.model('specialist', SpecialistSchema);