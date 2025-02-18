const { Router } = require("express");
const AuthMiddleware = require("../midlewares/auth");
const UserController = require("../controller/userController");
const router = Router();


router.post("/", AuthMiddleware, UserController.createUser);
router.put("/:id", AuthMiddleware, UserController.updateUser);
router.get("/:id", AuthMiddleware, UserController.getUser);
router.get("/", AuthMiddleware, UserController.getUsers);
router.delete("/:id", AuthMiddleware, UserController.deleteUser);


module.exports = { router };