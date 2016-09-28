const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var notesSchema = new Schema({
    id: {type: Number, required: true},
    title: {type: String, required: true},
    noteBody: {type: String, required: true},
    deleted: {type: Boolean}
});

module.exports = mongoose.model('list', notesSchema);