const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { tokenValidated } = require("../middleware/auth"); 

router.get("/", userController.getAllUser);

router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);

router.put("/:id", tokenValidated, userController.updateUser);

router.delete("/:id", tokenValidated, userController.deleteUserById);

router.post("/login", userController.login);

module.exports = router;


