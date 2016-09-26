const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var notesSchema = new Schema({
    note: {type: String, required: true},
    deleted: {type: Boolean}
});

module.exports = mongoose.model('list', notesSchema);

const showAll = function (callback) {
    this.find((err, notes) => {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }

        if (!notes) {
            return res.status(404).send('Database is empty');
        }

        callback(err, notes);
    });
};

const createNote = function (newNote, callback) {
    newNote.save(function (err, note) {
        if (err) {
            return callback(err);
        }
        callback(null, note);
    });
};
const updateNote = function(id, updatedData, callback) {
    this.findOneAndUpdate(
        {_id: id}, {
            $set: {
                note: updatedData
            }
        },
        (err, foundNote) => {

            if (err) {
                throw err;
            } else {
                foundNote.note = updatedData;
                console.log(foundNote.note, '           s');
                callback(err, foundNote);
            }
        });
};
const deleteNote = function (id, callback) {
    this.findOneAndUpdate(id, {
            $set: {
                deleted: true
            }
        },
        {upset: true},
        (err, updatedNote) => {
            if (err) {
                console.log('error occured ' + err);
                return res.status(500).send();
            } else {
                updatedNote.deleted = true;

                callback(err, updatedNote);
            }
        });
};

module.exports.showAll = showAll;
module.exports.createNote = createNote;
module.exports.updateNote = updateNote;
module.exports.deleteNote = deleteNote;