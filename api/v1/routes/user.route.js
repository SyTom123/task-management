const express = require("express");
const controller = require("../../v1/controller/user.controller");
const router = express.Router();

router.post("/register", controller.register);


module.exports = router;