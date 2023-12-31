const usersController = require("../Controller/usersController")
const express = require("express")
const router = express.Router()

router.route("/").get(usersController.getUsers)

router.route("/signup").post(usersController.singUp)

router.route("/login").post(usersController.logIn)

// router.route("/logout").post(usersController.logOut)




module.exports = router