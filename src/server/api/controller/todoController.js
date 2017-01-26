var express = require('express');
var notesCollection = require('../repository/todoRepository');
var mongoose = require('mongoose');
var todoList = require('../model/todoScheme');
var User = require('../model/userScheme');


var localStrategy = require('passport-local').Strategy;


var router = express.Router();

router.post('/register', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;


    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirmPassword', 'password do not match').equals(req.body.password);




    var errors = req.validationErrors();
    if(errors) {
        console.log('u have error')
        res.status(400).send(errors)
    }else {

        var newUser = new User({
            name:name,
            email:email,
            password:password


        })
        User.createUser(newUser, function (err, user) {
            if(err) throw err;
            res.status(200).send(user);
        })
    }








});
router.post('/login', function (req, res) {

});


router.get('/notes', function (req, res) {
    mongoose.model('list').find(function (err, data) {
        if (err) {
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

    notesCollection.updateNote({_id: req.params.id}, req.body.noteBody, req.body.status, (foundNote, err) => {
        if (err) {
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