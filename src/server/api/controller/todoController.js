var express = require('express');
var notesCollection = require('../repository/todoRepository');
var mongoose = require('mongoose');
var todoList = require('../model/todoScheme');

var router = express.Router();

router.get('/notes', function (req, res) {
    mongoose.model('list').find(function (err, data) {
        if(err) {
            res.status(404);
        }
        function check(value) {
            return value.deleted !== true;
        }
        var a = data.filter(check);
        res.send(a)
    });
});
router.post('/notes', function (req, res) {
    var newNote = new todoList();
    newNote.title = req.body.title;
    newNote.noteBody = req.body.noteBody;
    newNote.status = false;
    newNote.deleted = false;
        notesCollection.createNote(newNote, function (err, note) {
            if (err) {
                console.log(err);
                res.status(400);
            } else {
                res.status(200).send(note);
            }
        });
});

router.put('/notes/:id', function (req, res) {

    notesCollection.updateNote({_id: req.params.id}, req.body.noteBody, req.body.status, (foundNote,err) => {
        if(err) {
            console.log(err);
            res.status(400);
        }
        res.status(200).send(foundNote);
    });
});

router.delete('/notes/:id', function (req, res) {

    notesCollection.deleteNote({_id: req.params.id}, (err, foundNote) => {
        if (err) {
            console.log(err);
            res.status(401).send();
        } else {
            res.status(204).send(foundNote);
        }
    });
});

module.exports = router;