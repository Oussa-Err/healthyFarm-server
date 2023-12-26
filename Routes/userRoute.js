const usersController = require("../Controller/usersController")
const express = require("express")
const router = express.Router()

router.route("/").get(usersController.getUsers)

router.route("/signup").post(usersController.singUp)

router.route("/login").post(usersController.login)

// router.route("/logout").post()




module.exports = router