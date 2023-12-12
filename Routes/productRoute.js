const controllers = require("../Controller/productsController");
const express = require("express")
const router = express.Router()


router.route("/")
    .get(controllers.getProducts)
    .post(controllers.createVegetable)
    
router.route("/:id").get(controllers.getProductsById)
    
module.exports = router