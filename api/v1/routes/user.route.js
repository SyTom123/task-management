const express = require("express");
const controller = require("../../v1/controller/user.controller");
const authMiddleware = require("../../v1/middleware/authen.middleware");
const router = express.Router();

router.post("/register", controller.register);

router.post("/login", controller.login);

router.post("/password/forgot", controller.forgotPassword);

router.post("/password/otp", controller.otpPassword);

router.post("/password/reset", controller.resetPassword);

router.get("/detail", authMiddleware.requireAuth, controller.detail);

module.exports = router;