const express = require('express');
const router = express.Router();
const Users = require('../model/User.model');
const urlParse = require('url-parse');

router.route('/login')
    .get((req, res) => {
        let {query} = urlParse(req.url, true)
        let {email, password} = query
        console.log(query, 'from /login in routes.js')
       
        Users.findOne({ email })
            .then(User => {
                
                let { name, email, exercises } = User;
                console.log(User, 'User from /login in routes.js')
                if (User.password === password) {
                    res.json({ name, email, exercises })
                    console.log({name, exercises, email}, 'from login() in routes')
                } else if (User.password !== password) {
                    res.json({ response: 'Password Incorrect' })
                } else {
                    res.json({ response: 'User Not Found' })
                }
            }).catch(err => { console.log(err) })
    })
router.route('/newAccount')
    .post((req, res) => {
      
        let newAccount = new Users(req.body);
        Users.countDocuments()
            .then(uid => {
                console.log(uid, 'from newAccount in routes.js')
                newAccount.uid = uid + 1;
                newAccount.save()
                    .then(User => {
                        let {name, email, exercises}= User
                        res.json({name, email, exercises })
                    }).catch(err => { console.log(err, 'error from /newAccount in routes.js ') })
            })
    })
router.route('/addEx')
    .put((req, res) => {
        console.log(req.body)
        let { email, exercise } = req.body;
        Users.findOne({ email })
            .then(User => {                 
                console.log(User.exercises)
                User.exercises.push(exercise)
                console.log(User.exercise)
                User.save()
                    .then(UpdatedEx => {
                        let { exercises } = User
                        res.json({ exercises })
                        console.log('SUCCESSFULLY ADDED EX from addEx in routes.js')
                    }).catch(err => console.log(err, 'FAIL'))
            }).catch(err=>console.log(err, 'FAIL'))
    })
router.route('/editEx')
    .put((req, res) => {
        let { email, exercise } = req.body
        Users.findOne({ email })
            .then(User => {
                let editedEx = User.exercises.filter(ex => ex.exid !== exercise.exid)
                editedEx.push(exercise)
                User.exercises = editedEx
                User.save()
                    .then(updatedEx => {
                        let { exercises } = User
                        res.json({ exercises })
                        console.log('Edited Ex from routes.js')
                    }).catch(err => console.log(err, 'err from save portion of updateEx'))
            }).catch(err => console.log(err, 'err from find one portion of updatedEx'))
    })
router.route('/deleteEx')
    .delete((req, res) => {
        console.log(req.body)
        let { email, exid } = req.body;


        Users.findOne({ email })
            .then(User => {
                
                console.log(User,'User from delete() in routes')
                let updatedEx = User.exercises.filter(ex => ex.exid !== exid)
                User.exercises = updatedEx
                console.log(updatedEx,'updatedEx from delete in routes')
                User.save()
                    .then(ex => {
                        let { exercises } = User
                        res.json({ exercises })
                        console.log('Deleted Ex in routes.js')
                    }).catch(err=>console.log(err, 'FAIL'))
            }).catch(err=>console.log(err))
    })

module.exports = router