const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
    getMedicines,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    getLowStock
} = require("../controllers/medicineController");

router.get("/", protect, getMedicines);
router.get("/lowstock", protect, getLowStock);
router.post("/", protect, addMedicine);
router.put("/:id", protect, updateMedicine);
router.delete("/id", protect, deleteMedicine);

module.exports = router;