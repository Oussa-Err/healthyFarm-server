const express = require("express")
const morgan = require("morgan")
const productRoute = require("./Routes/productRoute")
const globaleErrController = require("./Controller/globaleErrController")
const CustomError = require("./Utils/CustumErr")
const cors = require("cors")
const app = express()

app.use(express.json({ limit: "25mb" }))
app.use(morgan("dev"))
app.use(cors())
app.options('*', cors());

app.use("/api/v1/products", productRoute)

app.all("*", (req, res, next) => {
    next(new CustomError(`url ${req.originalUrl} not found`, 404))
})

app.use(globaleErrController)

module.exports = app

