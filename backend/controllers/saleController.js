const Sale = require("../models/saleModel");
const Medicine = require("../models/medicineModel");

//get all sales:
const getSales = async (req, res) => {
    try {
        const sales = await Sale.find().sort({ date: -1 }); //getting newest sales first 
        res.json(sales);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

// record a new sale and reduce stock:
const recordSale = async (req, res) => {
    try {
        const { medicineId, quantity } = req.body;
        const medicine = await Medicine.findById(medicineId);
        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        if (medicine.stock < quantity) {
            return res.status(400).json({ message: "Not enough stock" });
        }

        const totalPrice = medicine.price * quantity;

        //reducing the stock and save:
        medicine.stock = medicine.stock - quantity;
        await medicine.save();

        const sale = await Sale.create({
            medicineName: medicine.name,
            quantity,
            totalPrice
        });

        res.status(201).json(sale);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = {getSales, recordSale};