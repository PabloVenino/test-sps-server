const { Router } = require("express");
const AuthMiddleware = require("../midlewares/auth");
const AuthController = require("../controller/authController");
const router = Router();


router.post("/", AuthController.loginUser);
// router.post("/:email", AuthMiddleware, AuthController.forgotPassword);


module.exports = { router };