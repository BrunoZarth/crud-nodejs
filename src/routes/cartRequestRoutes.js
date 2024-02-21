const express = require("express");
const router = express.Router();
const cartRequestController = require("../controller/cartRequestController");
const { tokenValidated } = require("../middleware/auth"); 

router.get("/", cartRequestController.getAllCartRequest);

router.get("/:id", cartRequestController.getCartRequestById);

router.post("/", cartRequestController.createCartRequest);

router.put("/:id", tokenValidated, cartRequestController.updateCartRequest);

router.delete("/:id", tokenValidated, cartRequestController.deleteCartRequestById);

module.exports = router;


