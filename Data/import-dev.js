const fs = require('fs')
const Vegetables = require("../Model/vegetableModel.js")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Users = require('../Model/userModel.js')
dotenv.config({path: ".env"})

mongoose.connect(process.env.MONGO_CONN)
    .then(connection => {
        console.log("DB connection successful")
    }).catch(err => {
        console.log(`DB connection failed \n${err}`)
    })


const importData = async () => {
    const vegetables = JSON.parse(fs.readFileSync("Data/vegetables.json", "utf-8"))
    
    try{
        await Vegetables.insertMany(vegetables)
        console.log("vegetables imported successful")
        process.exit(1)
    }catch(err){
        console.log(err)
    }
}


const deleteData = async () => {

    try {
        // await Vegetables.deleteMany({})
        await Users.deleteMany({})
        console.log("users deleted successful")
        process.exit(1)
    }catch(error) {
        console.log(error)
    }
}

if (process.argv[2] === '--import') importData()
if (process.argv[2] === '--delete') deleteData()