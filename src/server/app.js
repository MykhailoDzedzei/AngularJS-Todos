var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var notesCollection = require('./api/notes/notesController');


var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect('mongodb://localhost:27017/todos');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    mongoose.model('list').find(function (err, data) {
        res.send(data)
    });


});
app.post('/add', function (req, res) {
    var data = req.body.user;
    console.log(data);
    var newNote = new notesCollection();
    newNote.note = 'Some stringss';
    newNote.deleted = false;

    notesCollection.createNote(newNote, function (err, note) {
        if (err) {
            console.log(err);
            res.status(400);
        } else {
            res.send(note);
        }
    });

});
app.get('/update', function (req, res) {
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