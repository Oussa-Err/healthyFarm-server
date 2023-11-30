const Vegetables = require("../Model/vegetableModel.js")


exports.getProducts = async (req, res) => {
    const vegetables = await Vegetables.find()
    console.log(vegetables)
    
    try {
        res.status(200).json({
            status: "so far so good",
            data: vegetables
        })
    }
    catch (error) {
        res.status(404).json({
            status: "fail",
            error
        })
    }
} 
