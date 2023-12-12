const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        unique: true,
        minlength: [3, "user name must be at least 3 characters"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true, 
        required: true,
        validate: [validator.isEmail, "please enter a valid email"]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: true, 
        minlength: [8, 'minimum 8 characters'],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Users = mongoose.model("Users", userSchema)

module.exports = Users