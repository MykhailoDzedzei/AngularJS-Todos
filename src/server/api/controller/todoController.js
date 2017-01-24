var express = require('express');
var notesCollection = require('../repository/todoRepository');
var mongoose = require('mongoose');
var todoList = require('../model/todoScheme');

var router = express.Router();

router.get('/allNotes', function (req, res) {
    mongoose.model('list').find(function (err, data) {
        function check(value) {
            return value.deleted !== true;
        }

        var a = data.filter(check);
        res.send(a)
    });
});
router.post('/add', function (req, res) {

    var newNote = new todoList();
    newNote.title = req.body.title;
    newNote.noteBody = req.body.noteBody;
    newNote.status = false;
    newNote.deleted = false;
    var allNotes;
    mongoose.model('list').find(function (err, data) {
        allNotes = data.length;
        let lastId = 0;
        if (allNotes > 0) {
            lastId = allNotes + 1;
        }
        newNote.id = lastId;

        notesCollection.createNote(newNote, function (err, note) {
            if (err) {
                console.log(err);
                res.status(400);
            } else {
                res.send(note);
            }
        });

    });
});

router.post('/edit', function (req, res) {
    notesCollection.updateNote({_id: req.body._id}, req.body.noteBody, req.body.status, (foundNote) => {
        res.status(204).send(foundNote);
    });
});

router.post('/delete', function (req, res) {

    notesCollection.deleteNote({_id: req.body._id}, (err, foundNote) => {
        if (err) {
            res.status(401).send();
        } else {
            res.status(204).send(foundNote);
        }
    });
});

module.exports = router;