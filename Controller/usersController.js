const jwt = require("jsonwebtoken")
const asyncErrHandler = require("../Utils/asyncErrHandler");
const User = require("../Model/userModel.js")
const CustomErr = require("../Utils/CustomErr.js")
const dotenv = require("dotenv")
dotenv.config({ path: "../.env" })

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY, { expiresIn: "1h" })
}

exports.getUsers = asyncErrHandler(async (req, res) => {
    const users = await User.find({}).select(["-password", "-confirmedPassword"])

    res.status(200).json({
        status: "success!",
        data: users
    })
})

exports.singUp = asyncErrHandler(async (req, res) => {
    const user = await User.create(req.body)
    
    const token = signToken(req.body._id)
    res.status(200).json({
        status: "created!",
        user
    })
})

exports.login = asyncErrHandler(async (req, res) => {
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

    console.log(user)
    res.status(200).json({
        status: "loged in!",
        data: token
    })
})


