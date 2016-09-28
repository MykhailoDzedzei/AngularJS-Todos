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

app.get('/allNotes', function (req, res) {
    mongoose.model('list').find(function (err, data) {
        console.log(data.length);
        // for(var i = 0; i < data.length; i++) {
        //     console.log(data[i].deleted, 'before if');
        //     if(data[i].deleted === true) {
        //         console.log(data[i].deleted, 'after if');
        //         delete data[i];
        //     }
        // }
        function isBigEnough(value) {
            return value.deleted !== true;
        }
        var a = data.filter(isBigEnough);
        res.send(a)
    });


});
app.post('/add', function (req, res) {
    
    var newNote = new notesCollection();
    newNote.title = req.body.title;
    newNote.noteBody = req.body.noteBody;
    newNote.deleted = false;
    console.log(newNote);
    var allNotes ;
        mongoose.model('list').find(function (err, data) {
            allNotes = data.length;
            let lastId = 0;
            if (allNotes > 0) {
                lastId = allNotes + 1;
            }
            newNote.id = lastId ;

            notesCollection.createNote(newNote, function (err, note) {
                if (err) {
                    console.log(err);
                    res.status(400);
                } else {
                    console.log(note);
                    res.send(note);
                }
            });

    });


});
app.post('/edit', function (req, res) {
    notesCollection.updateNote({_id:req.body._id}, req.body.noteBody, (foundNote) => {
            res.status(204).send(foundNote);
    });
});

app.post('/delete', function (req, res) {
    console.log(req.body, 'IDDD');
    notesCollection.deleteNote({_id: req.body._id}, (err, foundNote) => {
        if (err) {
            console.log('here ', foundNote);
            res.status(401).send();
        } else {
            console.log(foundNote, 'deleted???')
            res.status(204).send(foundNote);
        }
    });
});

app.listen(3000, function () {
    console.log('Server works at localhost:3000');
});



