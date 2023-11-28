const express = require("express")
const app = express()
const morgan = require("morgan")


app.use(express.json())


app.get("/", (req, res) => {
    res.status(200).json({
        status: "good sign"
    })
})




module.exports = app
 
