const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo_url: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    genre: {
        type: [String],
        required: [true, "genre is a required field"],
        // enum: {
        //     value: ["vegetables", "meat", "oil"],
        //     message: "the genre should be only whitin these {{VALUE}}"
        // }
    },
    quantity: {
        type: String,
        default: "2kg",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });




const Vegetables = mongoose.model("Vegetables", productSchema)

module.exports = Vegetables