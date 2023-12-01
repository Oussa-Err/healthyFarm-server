const Vegetables = require("../Model/vegetableModel.js")
const asyncErrHandler = require("./globaleErrController.js")


exports.getProducts = asyncErrHandler(async (req, res) => {
    const vegetables = await Vegetables.find()
    res.status(200).json({
        status: "so far so good",
        data: vegetables
    })

})

exports.getProductsById = asyncErrHandler(async (req, res) => {

    const vegetable = await Vegetables.findById(req.params.id)

    if (!vegetable) res.status(404).json({
        status: fail,
        error: "id not found"
    })

    console.log(vegetable)
    res.status(200).json({
        status: "success!",
        data: vegetable
    })
})
