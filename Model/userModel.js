const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")

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
        // select: false
    },
    confirmedPassword: {
        type: String,
        required: true,
        validate: {
            validator: function () {
                return this.confirmedPassword === this.password
            },
            message: "confirmed password should match the password"
        },

        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        type: String,
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } })

userSchema.pre("save", async function (next) {
    this.createdBy = this.name

    if (!this.isModified("password")) next()
    this.password = await bcrypt.hash(this.password, 10)
    this.confirmedPassword = undefined;
    next()
    return next(err)
})

userSchema.methods.comparePwdToDbPwd = async function (password, dbPassword) {
    console.log(password + dbPassword)
    return await bcrypt.compare(password, dbPassword)
}


const Users = mongoose.model("Users", userSchema)

module.exports = Users