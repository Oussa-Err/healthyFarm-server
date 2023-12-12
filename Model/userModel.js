const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    last_name: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Users = mongoose.model("Users", userSchema)

module.exports = Users