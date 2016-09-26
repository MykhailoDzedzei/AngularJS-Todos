var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var notesCollection = require('./api/notes/notesController');


var app = express();

mongoose.connect('mongodb://localhost:27017/todos');


app.get('/', function (req, res) {
    mongoose.model('list').find(function (err, data) {
    res.send(data)
    });


});
app.get('/add', function (req, res) {
    var newNote = new notesCollection();
    newNote.note = 'Some stringss';
    newNote.deleted = false;

    notesCollection.createNote(newNote ,function(err, note) {
        if (err) {
            console.log(err);
            res.status(400);
        } else {
            res.send(note);
        }
    });

});
app.get('/update', function (req, res) {
    var data = 'some new dddddddddddddddddata';
    var id =  '57e94ef9fd340afc1543f03c';
        notesCollection.updateNote({_id: id}, data, (err, foundNote) => {
            if (err) {
                console.log('err  ', err);
                res.status(401).send();
            } else {
                res.status(204).send(foundNote);
            }
        });
});

app.get('/delete', function (req, res) {
    var id =  '57e95abf21e91e4833a27827';
    notesCollection.deleteNote({_id: id}, (err, foundNote) => {
        if (err) {
            console.log('err  ', err);
            res.status(401).send();
        } else {
            res.status(204).send(foundNote);
        }
    });
});

app.listen(3000, function () {
    console.log('Server works at localhost:3000');
});