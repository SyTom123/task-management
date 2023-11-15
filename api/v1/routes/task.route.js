const express = require("express");
const controller = require("../../v1/controller/task.controller");
const router = express.Router();

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

module.exports = router;