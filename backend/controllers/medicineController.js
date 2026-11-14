const Medicine = require("../models/medicineModel");
const getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.json(medicines);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const addMedicine = async (req, res) => {
    try {
        const { name, category, manufacturer, price, stock, expiryDate } = req.body;

        const medicine = await Medicine.create({
            name, category, manufacturer, price, stock, expiryDate
        });

        res.status(201).json(medicine);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const updateMedicine = async (req, res) => {
    try {
        const { name, category, manufacturer, price, stock, expiryDate } = req.body;
        const medicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            { name, category, manufacturer, price, stock, expiryDate },
            { new: true, runValidators: true }
        );

        if (!medicine) {
            return res.status(404).json({ message: "Medicine not Found." });
        }

        res.json(medicine);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const deleteMedicine = async (req, res) => {
    try {
        const medicine = Medicine.findByIdAndDelete(req.params.id);

        if (!medicine) {
            res.status(404).json({ message: "Medicine not found" });
        }

        res.json({ message: "Medicine Deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = { getMedicines, addMedicine, updateMedicine, deleteMedicine };   