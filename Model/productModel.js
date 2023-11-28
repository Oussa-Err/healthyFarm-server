const mongoose = require("mongoose")

const productSchema = new Schema({
    name: {type: String, unique: true},
})
console.log(productModel)

const Products = mongoose.model("Products", productSchema)

module.exports = Products