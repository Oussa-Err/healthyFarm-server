const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo_url: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });




const Vegetables = mongoose.model("Vegetables", productSchema)

module.exports = Vegetables