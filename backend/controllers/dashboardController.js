const Medicine = require("../models/medicineModel");
const Sale = require("../models/saleModel");

const getDashboardStats = async (req, res) => {
  try {
    // total number of medicines
    const totalMedicines = await Medicine.countDocuments();

    // total stock available across all medicines
    const stockResult = await Medicine.aggregate([
      { $group: { _id: null, total: { $sum: "$stock" } } }
    ]);
    const availableStock = stockResult.length > 0 ? stockResult[0].total : 0;

    // total sales amount
    const salesResult = await Sale.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);
    const totalSales = salesResult.length > 0 ? salesResult[0].total : 0;

    // sales grouped by month
    const monthlySales = await Sale.aggregate([
      { $group: { _id: { $month: "$date" }, total: { $sum: "$totalPrice" } } },
      { $sort: { _id: 1 } }
    ]);

    // most sold medicines (top 5 by quantity)
    const mostSold = await Sale.aggregate([
      { $group: { _id: "$medicineName", totalQuantity: { $sum: "$quantity" } } },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      totalMedicines,
      availableStock,
      totalSales,
      monthlySales,
      mostSold
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { getDashboardStats };