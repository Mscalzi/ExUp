const mongoose = require('mongoose')
const User = require('../model/User.model')
require('dotenv').config()

const MongoURI = 'mongodb://127.0.0.1:27017/ExUp'
mongoose.connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open', () => {
    console.log('Connected to DB')
})

const Users = [
    {
        name: 'Matthew Scalzi',
        email: 'MatthewScalzi@email.com',
        password: 'poops1',
        exercises:
            [{
                date: '2021-09-01',
                exercise: 'Push Ups',
                sets: 40,
                reps: 10,
                durration: '30 min',
                exid: 1
            }, {
                date: '2021-09-02',
                exercise: 'Pull Ups',
                sets: 10,
                reps: 10,
                durration: '30 min',
                exid: 2
            }],
        uid: 1
    },
    {
        name: 'Bob Barker',
        email: 'BobBarker@email.com',
        password: 'poops1',
        exercises: [{
            date: '2021-09-01',
            exercise: 'Push Ups',
            sets: 25,
            reps: 25,
            durration: '30 min',
            exid: 1
        },
        {
            date: '2021-09-02',
            exercise: 'Pull Ups',
            sets: 12,
            reps: 15,
            durration: '35 min',
            exid: 2
        },
        {
            date: '2021-09-02',
            exercise: 'Burpees',
            sets: 1,
            reps: 123,
            durration: '10 min',
            exid: 3
        }]
    }
]
User.deleteMany()
    .then(()=>{
        console.log('cleared DB')
    })

User.create(Users)
    .then(()=>{
        console.log('Seeded DB')
    }).catch(err =>{
        console.log('Users rejected in Seeder')
    })

setTimeout(()=>{
    db.close()
},1000)