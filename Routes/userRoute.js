const usersController = require("../Controller/usersController")
const express = require("express")
const router = express.Router()

router.route("/").get(usersController.getUsers)
    .post(usersController.createUser)



module.exports = router