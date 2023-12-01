class CustumErr extends Error {
    constructor(statusCode, statusMsg) {
        super(message)
        statusCode = this.statusCode || 400
        statusMsg = this.statusMsg || "something went wrong try again later"

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = CustumErr