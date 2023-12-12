const productController = require("../Controller/productsController");
const express = require("express")
const router = express.Router()


router.route("/")
    .get(productController.getProducts)
    .post(productController.createVegetable)

router.route("/:id").get(productController.getProductsById)
    .delete(productController.deleteProduct)
    .put(productController.updateProduct)

module.exports = router