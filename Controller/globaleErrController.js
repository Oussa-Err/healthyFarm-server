const dotenv = require("dotenv")
dotenv.config({ path: "../.env" })
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
        res.status(500).json({
            status: "error",
            message: "Error unknown, please try again later"
        })
    }
}


const validationError = (err) => {
    const errObj = err.errors
    for (const key in errObj) {
        return new CustomErr(errObj[key].message, 400)
    }
}

const castErr = (err) => {
    const msg = `Invalid value for ${err.path}: ${err.value}`
    return new CustomErr(msg, 404)
}

const duplicateKeyErr = (err) => {
    let message

    if (err.keyValue.name) message = new CustomErr(`This name already exists: ${err.keyValue.name}`, 400)

    if (err.keyValue.email) message = new CustomErr(`This email already exists: ${err.keyValue.email}`, 400)

    return message
}

const tokenExpiredErr = () => {
    return new CustomErr("Long time no see, please log in again", 401)
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"

    if (process.env.NODE_ENV === "development") {
        devErr(res, err)
    }

    if (process.env.NODE_ENV === "production") {

        if (err.name === "ValidationError") err = validationError(err)

        if (err.name === "CastError") err = castErr(err)

        if (err.code === 11000) err = duplicateKeyErr(err)

        if (err.name === "TokenExpiredError") err = tokenExpiredErr(err)

        prodErr(res, err)
    }
}