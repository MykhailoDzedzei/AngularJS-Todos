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
        console.log(data.length);
        res.send(data)
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



app.get('/add', (req, res) => {
    res.render('add.html', {
        title: 'Add',
        method: '/add',
        user: {},
        portName: port
    });
});
app.post('/add', (req, res) => {
    let first = req.body;
    let lastId = 0;
    if (users.length > 0) {
        lastId = users[users.length - 1].id;
    }
    first.id = lastId + 1;
    users.push(first);
    jsonfile.writeFileSync(file, users, {spaces: 2});
    res.redirect('/');

});
app.get('/edit/:id', (req, res) => {
    let userId = req.params.id;
    res.render('add.html', {
        title: 'Edit',
        method: '/edit/' + userId,
        user: usersAction(userId)
    });
});
app.post('/edit/:id', (req, res) => {
    let userId = req.params.id;
    let userObj = usersAction(userId);
    userObj.userName = req.body.userName;
    userObj.age = req.body.age;
    jsonfile.writeFileSync(file, users, {spaces: 2});
    res.redirect('/');

});

app.post('/delete/:id', (req, res) => {
    let userId = req.params.id;
    let userObj = usersAction(userId);
    let indexObj = users.indexOf(userObj);
    users.splice(indexObj, 1);
    jsonfile.writeFileSync(file, users, {spaces: 2});
    res.redirect('/');


});




