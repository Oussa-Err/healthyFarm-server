const Vegetables = require("../Model/vegetableModel.js")
const asyncErrHandler = require("../Utils/asyncErrHandler.js")
const cloudinary = require("../Utils/cloudinary.js")
const CustomErr = require("../Utils/CustomErr.js")

exports.getProducts = asyncErrHandler(async (req, res) => {
    let products
    if (req.query.genre) {
        const genre = req.query.genre
        products = await Vegetables.find({ genre });
    } else if (req.query.name) {
        const name = req.query.name
        products = await Vegetables.find({ name })
    } else {
        products = await Vegetables.find();
    }

    res.status(200).json({
        status: "success",
        data: products,
    });
})

exports.getProductsById = asyncErrHandler(async (req, res, next) => {

    const vegetable = await Vegetables.findById(req.params.id)

    if (!vegetable) {
        const error = new CustomErr(`This ID: ${req.params.id} is not found`, 404)
        return next(error)
    }

    res.status(200).json({
        status: "success!",
        data: vegetable
    })
})

exports.createVegetable = asyncErrHandler(async (req, res) => {
    const { name, price, photo_url } = req.body

    const image = await cloudinary.uploader.upload(photo_url, {
        use_filename: true,
        unique_filename: true,
        folder: "vegetables",
        tags: 'healthyFarm',
    }).catch(err => { console.log(err) })

    const product = await Vegetables.create({
        name,
        price,
        photo_url: {
            public_id: image.public_id,
            url: image.secure_url
        },
    })

    res.status(201).json({
        status: "created!",
        data: product
    })
})

exports.updateProduct = asyncErrHandler(async (req, res, next) => {
    const product = await Vegetables.findOne({ "_id": req.params.id })

    if (!product) {
        next(new CustomErr(`This ID: ${req.params.id} is not found`, 400))
    }

    const updatedProduct = await Vegetables.findByIdAndUpdate(product._id, req.body)

    res.status(200).json({
        status: "updated!",
        data: updatedProduct
    })
})

exports.deleteProduct = asyncErrHandler(async (req, res, next) => {
    const deletedProduct = await Vegetables.deleteOne({ "_id": req.params.id })

    if (!deletedProduct) {
        const msg = `This ID: ${req.params.id} is not found`
        next(msg, 400)
    }

    res.status(200).json({
        status: "deleted!",
        message: deletedProduct
    })
})