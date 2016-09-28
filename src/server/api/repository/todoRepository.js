const todoList = require('../model/todoScheme');

const showAll = function (callback) {
    todoList.find((err, notes) => {
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
    todoList.findOneAndUpdate(
        {_id:id},
        {$set: {
            noteBody: updatedData
        }},
        {upsert:true},
        function (err, editedNote) {
            if(err) {
                callback(editedNote)
            }else {
                editedNote.noteBody = updatedData;
                callback(editedNote);
            }
        }
     );
};

const deleteNote = function (id, callback) {
    todoList.findOneAndUpdate(id, {
            $set: {
                deleted: true
            }
        },
        {upset: true},
        (err, updatedNote) => {
            if (err) {
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