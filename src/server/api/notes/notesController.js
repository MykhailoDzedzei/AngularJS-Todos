const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var notesSchema = new Schema({
    id: {type: Number, required: true},
    title: {type: String, required: true},
    noteBody: {type: String, required: true},
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
    list = this;
    console.log(updatedData,' updated data');
    console.log(id, 'sssssss');
    list.findOneAndUpdate(
        {_id:id},
        {$set: {
            noteBody: updatedData
        }},
        {upsert:true},
        function (err, editedNote) {
            console.log(editedNote, 'edited note');
            if(err) {
                console.log("errorrrrrrr");
                callback(editedNote)
            }else {
                editedNote.noteBody = updatedData;
                callback(editedNote);
            }
        }
     );
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