const mongoose = require('mongoose')
const { Schema } = mongoose
const ExSchema = require('./Ex.model')

const UserSchema = new Schema({
    uid: Number,
    name: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    exercises: [ExSchema]

})
const Users = mongoose.model('Users', UserSchema)
module.exports = Users