const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  medicineName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;