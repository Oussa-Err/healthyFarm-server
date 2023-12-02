const dotenv = require("dotenv")
dotenv.config({path: "../.env"})
const CustumErr = require("../Utils/CustumErr")


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
    return new CustumErr(msg, 404)
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"

    if(process.env.NODE_ENV === "development") {
        devErr(res, err)
    }

    if(process.env.NODE_ENV === "production") {
        if (err.name === "CastError") err = castErr(err)
        
        prodErr(res, err)
    }
}