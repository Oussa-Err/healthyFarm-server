const controllers = require("../Controller/productsController");
const express = require("express")
const router = express.Router()


router.route("/").get(controllers.getProducts)

module.exports = router