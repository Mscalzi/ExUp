const mongoose = require('mongoose')
const {Schema} = mongoose

const ExSchema = new Schema({
    date: String,
    exercise: String,
    sets: Number,
    reps: Number,
    durration: String,
    exid: Number
})
module.exports = ExSchema