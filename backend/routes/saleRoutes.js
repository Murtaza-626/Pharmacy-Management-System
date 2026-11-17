const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getSales, recordSale } = require("../controllers/saleController");

router.get("/", protect, getSales);
router.post("/", protect, recordSale);

module.exports = router;