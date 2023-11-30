const fs = require('fs')
const Vegetables = require("../Model/vegetableModel.js")

const importData = async () => {
    const vegetables = JSON.parse(fs.readFileSync("Data/vegetables.json", "utf-8"))
    console.log(vegetables)
    try{
        await Vegetables.insertMany(vegetables)
        console.log("vegetables imported successful")
    }catch(err){
        console.log(err)
    }
}


const deleteData = async () => {

    try {
        await Vegetables.deleteMany({})
        console.log("success")
    }catch(error) {
        console.log(error)
    }
}

if (process.argv[2] === '--import') importData()
if (process.argv[2] === '--delete') deleteData()
console.log(process.argv[2])
