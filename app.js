const express = require("express")
const morgan = require("morgan")
const productRoute = require("./Routes/productRoute")


const app = express()

app.use(express.json())
app.use(morgan("dev"))

app.use("/api/v1/products", productRoute)



module.exports = app
 
