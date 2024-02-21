const express = require("express");
const router = express.Router();
const cartRequestController = require("../controller/cartRequestController");
const { tokenValidated } = require("../middleware/auth"); 

router.get("/", cartRequestController.getAllCartRequest);

router.get("/cartId/:id", cartRequestController.getCartRequestByCartId);

router.get("/requestId/:id", cartRequestController.getCartRequestByRequestId);

router.get("/:cartId/:requestId", cartRequestController.getCartRequestByCartIdRequestId);

router.post("/", cartRequestController.createCartRequest);

router.put("/:id", tokenValidated, cartRequestController.updateCartRequest);

router.delete("/:requestId/:cartId", tokenValidated, cartRequestController.deleteByRequestIdCartId);

module.exports = router;


