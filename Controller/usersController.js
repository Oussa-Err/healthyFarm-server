const asyncErrHandler = require("../Utils/asyncErrHandler");
const User = require("../Model/userModel.js")

exports.getUsers = asyncErrHandler(async (req, res) => {
    const users = await User.find({})
    

    res.status(200).json({
        status: "success!",
        data: users
    })
})

exports.createUser = asyncErrHandler(async (req, res) => {
    console.log(req.body)
    const userData = await User.create(req.body)

    res.status(200).json({
        status: "created!",
        data: userData
    })
})


