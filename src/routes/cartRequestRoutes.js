const express = require("express");
const router = express.Router();
const cartRequestController = require("../controller/cartRequestController");
const { tokenValidated } = require("../middleware/auth"); 

router.get("/", cartRequestController.getAllCartRequest);

router.get("/cartId", cartRequestController.getCartRequestByCartId);

router.get("/requestId", cartRequestController.getCartRequestByRequestId);

router.get("/cartId-requestId", cartRequestController.getCartRequestByRequestId);

router.post("/", cartRequestController.createCartRequest);

router.put("/:id", tokenValidated, cartRequestController.updateCartRequest);

module.exports = router;


