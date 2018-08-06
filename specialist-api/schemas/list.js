const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Specialist = require('./specialist');

const getRandomId = (lists) => {
    const rand = parseInt(Math.random() * lists.length);
    return lists[rand]._id;
}

const ListSchema = new Schema({
    tweets: [{
        type: mongoose.SchemaTypes.ObjectId
    }],
    specialists_done: [{
        type: mongoose.SchemaTypes.ObjectId
    }]
});

ListSchema.statics.getTweet = function ({ index, list_id }) {
    return this.findOne({ _id: list_id }).then((list) => {
        return mongoose.connection.db.collection('tweets').find({
            _id: list.tweets[index]
        }).toArray()
    });
}

ListSchema.statics.checkAndUpdate = function ({ _id, analyzing }) {
    const { index, list_id } = analyzing;
    const newIndex = index + 1;

    return this.findOne({ _id: list_id }).then((list) => {
        if (list.tweets.length <= newIndex) {
            return this.update({ _id: list_id }, { '$push' : { specialists_done : _id }}).then(() => {
                return this.find({ 'specialists_done' : {'$nin' : [_id] }}).then((otherLists) => {
                    return Specialist.update({ _id }, {
                        '$set': {
                            'analyzing.index': 0,
                            'analyzing.list_id': getRandomId(otherLists),
                        }
                    });
                });
            });
        }

        return Specialist.update({_id}, {
            '$set': { 'analyzing.index': newIndex }
        });
    });
}

module.exports = mongoose.model('list', ListSchema);