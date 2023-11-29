const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({path: "./.env"})

const server = require("./app.js")

mongoose.connect(process.env.MONGO_CONN)
.then(connection => {
    console.log("DB connection successful")
}).catch(err => {
    console.log(`DB connection failed \n${err}`)
})

server.listen(process.env.PORT || 8080, () => {
    console.log("server has started...")
})

