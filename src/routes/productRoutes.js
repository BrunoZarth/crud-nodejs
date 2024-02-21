const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const { tokenValidated } = require("../middleware/auth"); 

router.get("/", productController.getAllProduct);

router.get("/:id", productController.getProductById);

router.post("/", productController.createProduct);

router.put("/:id", tokenValidated, productController.updateProduct);

router.delete("/:id", tokenValidated, productController.deleteProductById);

module.exports = router;


