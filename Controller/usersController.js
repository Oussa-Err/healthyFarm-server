const jwt = require("jsonwebtoken")
const asyncErrHandler = require("../Utils/asyncErrHandler");
const User = require("../Model/userModel.js")
const CustomErr = require("../Utils/CustomErr.js")
const dotenv = require("dotenv")
const util = require('util')

dotenv.config({ path: "../.env" })

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY, { expiresIn: "1h" })
}

exports.getUsers = asyncErrHandler(async (req, res, next) => {
    const users = await User.find({})

    res.status(200).json({
        status: "success",
        data: users
    })
})

exports.singUp = asyncErrHandler(async (req, res) => {
    const user = await User.create(req.body)

    const token = signToken(req.body._id)

    res.status(200).json({
        status: "success",
        user
    })
})

exports.logIn = asyncErrHandler(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        const msg = "please enter both email and password"
        next(new CustomErr(msg, 400))
    }

    const user = await User.findOne({ email })
    if (!user) {
        const msg = "user doesn't exist"
        next(new CustomErr(msg, 400))
    }

    const isMatch = await user.comparePwdToDbPwd(password, user.password)
    if (!!!isMatch) {
        next(new CustomErr("password or email invalid", 400))
    }
    const token = signToken(user.id)

    res.status(200).json({
        status: "success",
        data: token
    })
})

exports.protect = asyncErrHandler(async (req, res, next) => {
    let token = req.headers.authorization

    if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1]
    }

    if (!token) {
        const err = new CustomErr('you are not logged in', 401)
        next(err)
    }

    const decodedToken = await util.promisify(jwt.verify)(token, process.env.JWT_PRIVATE_KEY)

    const user = await User.findOne({ _id: decodedToken._id })

    if (!user) {
        const err = new CustomErr('user is missing login again ', 401)
        next(err)
    }


    req.user = user
    next()
})

// exports.logOut


