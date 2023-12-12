const dotenv = require("dotenv")
dotenv.config({path: "../.env"})
const CustomErr = require("../Utils/CustomErr")


const devErr = (res, err) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stackTrace: err.stack,
        err: err
    })
}

const prodErr = (res, err) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        res.status(500).status({
            status: "error",
            message: "error unknown, please try again later"
        })
    }
}


const castErr = (err) => {
    console.log(err)
    const msg = `invalid value for ${err.path}: ${err.value}`
    return new CustomErr(msg, 404)
}

const duplicateKeyErr = (err) => {
    let msg
    if (err.KeyValue.name) msg = new CustomErr("this name already exist")
    if (err.KeyValue.email) msg = new CustomErr("this email already exist", 400)

    return msg
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"

    if(process.env.NODE_ENV === "development") {
        devErr(res, err)
    }

    if(process.env.NODE_ENV === "production") {
        if(err.name === "CastError") err = castErr(err)

        if(err.code === 11000) err = duplicateKeyErr(err)
        
        prodErr(res, err)
    }
}