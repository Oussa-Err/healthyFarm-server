const express = require("express")
const router = express.Router()
const usersController = require("../Controller/usersController")

router.route("/").get(usersController.protect, usersController.getUsers)

router.route("/signup").post(usersController.singUp)

router.route("/login").post(usersController.logIn).get(usersController.checkLogIn)

router.route("/logout").post(usersController.logOut)


module.exports = router