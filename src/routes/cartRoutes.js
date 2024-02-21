const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");
const { tokenValidated } = require("../middleware/auth"); 

router.get("/", cartController.getAllCart);

router.get("/:id", cartController.getCartById);

router.post("/", cartController.createCart);

router.put("/:id", tokenValidated, cartController.updateCart);

router.delete("/:id", tokenValidated, cartController.deleteCartById);

module.exports = router;


