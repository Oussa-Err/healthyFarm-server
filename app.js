const express = require("express")
const morgan = require("morgan")
const productRoute = require("./Routes/productRoute.js")
const userRoute = require("./Routes/userRoute.js")
const globaleErrController = require("./Controller/globaleErrController")
const CustomError = require("./Utils/CustomErr")
const cors = require("cors")
const app = express()
const cookieParser = require("cookie-parser")

app.use(cookieParser())
app.use(express.json({ limit: "25mb" }))
app.use(morgan("dev"))
app.use(cors())

app.options('*', cors());

app.use("/api/v1/products", productRoute)
app.use("/api/v1/users", userRoute)

app.all("*", (req, res, next) => {
    next(new CustomError(`url ${req.originalUrl} not found`, 404))
})

app.use(globaleErrController)

module.exports = app

