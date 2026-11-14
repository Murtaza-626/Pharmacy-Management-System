const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    }
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;