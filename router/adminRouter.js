const express = require("express");

const router = express.Router();

const adminController = require("../controller/adminController");

router.get("/admin", adminController.getAdmin);
router.post("/admin/add", adminController.addAdmin);

module.exports = router;
