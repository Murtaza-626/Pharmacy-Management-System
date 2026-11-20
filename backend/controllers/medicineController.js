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

        // looking for a medicine that matches on every detail except stock 
        const existing = await Medicine.findOne({
            name, category, manufacturer, price, expiryDate
        });

        if(existing){
            existing.stock = existing.stock + Number(stock);
            await existing.save();
            return res.status(200).json(existing);
        }

        // same medicine name but some detail is different, so do not add it
        const sameName = await Medicine.findOne({ name });
        if (sameName) {
            return res.status(400).json({
                message: "This medicine cannot be added. A medicine with this name already exists with different details."
            });
        }

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
        const medicine = await Medicine.findByIdAndDelete(req.params.id);

        if (!medicine) {
            res.status(404).json({ message: "Medicine not found" });
        }

        res.json({ message: "Medicine Deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const getLowStock = async(req, res)=>{
    try{
        const medicines = await Medicine.find({stock: {$lt: 10}});
        res.json(medicines);
    }
    catch(error){
        res.status(500).json({message: "Something went wrong"});
    }
};

module.exports = { getMedicines, addMedicine, updateMedicine, deleteMedicine, getLowStock };   