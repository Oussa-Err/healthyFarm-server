const controllers = require("../Controller/productsController");
const express = require("express")
const router = express.Router()


router.route("/").get(controllers.getProducts)
router.route("/:id").get(controllers.getProductsById)
    // .delete(controllers.deleteProduct)
    // .patch(controllers.updateProduct)

module.exports = router