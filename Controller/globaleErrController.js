const CustumErr = require("../Utils/CustumErr")

const devErr = () => {

}

const prodErr = () => {

}

module.exports = (err, req, res, next) => {
    console.log(req)
    new CustumErr("test fail", 400)
}