const Vegetables = require("../Model/vegetableModel.js")
const asyncErrHandler = require("../Utils/asyncErrHandler.js")
const cloudinary = require("../Utils/cloudinary.js")


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


exports.createVegetable = asyncErrHandler(async (req, res) => {
    const { name, price, photo_url } = req.body
    
    const image = await cloudinary.uploader.upload(photo_url, {
        use_filename: true,
        unique_filename: true,
        folder: "vegetables",
        tags: 'healthyFarm',
    }).catch(err => {console.log(err)})
    
    console.log(image)
    console.log("\n "+ req.body)

    const product = await Vegetables.create({
        name,
        price,
        photo_url: {
            public_id: image.public_id,
            url: image.url
        },
    })

    res.status(201).json({
        status: "created!",
        data: product
    })
})