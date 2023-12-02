const Vegetables = require("../Model/vegetableModel.js")
const asyncErrHandler = require("../Utils/asyncErrHandler.js")


exports.getProducts = asyncErrHandler(async (req, res) => {
    const vegetables = await Vegetables.find()

    res.status(200).json({
        status: "so far so good",
        data: vegetables
    })
})

exports.getProductsById = asyncErrHandler(async (req, res) => {

    const vegetable = await Vegetables.findById(req.params.id)
    
    res.status(200).json({
        status: "success!",
        data: vegetable
    })
})
