
const products = require("../Model/productModel")


exports.getProducts = async (req, res) => {
    const allProducts = await products.find()
    
    try {
        res.status(200).json({
            status: "so far so good",
            data: allProducts
        })
    }
    catch (error) {
        console.log(error)
    }
} 