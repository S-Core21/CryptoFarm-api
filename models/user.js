const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname : String,
    lastname : String,
    email: String,
    gender: String,
    occupation: String,
    knowledge: String,
    phno: Number,
    amt: Number
})

const User = mongoose.model('User', userSchema)

module.exports = User 