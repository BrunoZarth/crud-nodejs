const express = require("express");
const router = express.Router();
const requestController = require("../controller/requestController");
const { tokenValidated } = require("../middleware/auth"); 

router.get("/", requestController.getAllRequest);

router.get("/:id", requestController.getRequestById);

router.post("/", requestController.createRequest);

router.put("/:id", tokenValidated, requestController.updateRequest);

router.delete("/:id", tokenValidated, requestController.deleteRequestById);

module.exports = router;


