const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {type: String, unique: true},
})

const products = mongoose.model("Products", productSchema)


module.exports = products