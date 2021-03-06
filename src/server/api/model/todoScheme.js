const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var notesSchema = new Schema({
    title: {type: String, required: true},
    noteBody: {type: String, required: true},
    status: {type: Boolean, required: true},
    deleted: {type: Boolean}
});

module.exports = mongoose.model('list', notesSchema);