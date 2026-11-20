import { useState, useEffect } from "react";
import api from "../api";

export default function Dashboard() {
  const [stats, setStats] = useState({ totalMedicines: 0, totalSales: 0, availableStock: 0 });
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const statsRes = await api.get("/dashboard");
        setStats(statsRes.data);

        const lowRes = await api.get("/medicines/lowstock");
        setLowStock(lowRes.data);
      } catch (error) {
        console.log("Failed to load dashboard data");
      }
    };
    loadData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-black text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Summary cards for quick overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-blue-100 p-6 rounded shadow">
          <h2 className="text-black text-xl">Total Medicines</h2>
          <p className="text-blue-700 text-3xl font-bold mt-2">{stats.totalMedicines}</p>
        </div>

        <div className="bg-green-100 p-6 rounded shadow">
          <h2 className="text-black text-xl">Total Sales (Rs)</h2>
          <p className="text-green-700 text-3xl font-bold mt-2">{stats.totalSales}</p>
        </div>

        <div className="bg-yellow-100 p-6 rounded shadow">
          <h2 className="text-black text-xl">Available Stock</h2>
          <p className="text-yellow-700 text-3xl font-bold mt-2">{stats.availableStock}</p>
        </div>

      </div>

      {/* Low stock alerts section */}
      <div className="bg-red-50 p-6 rounded shadow">
        <h2 className="text-red-600 text-2xl font-bold mb-4">Low Stock Alerts</h2>
        <ul className="list-disc pl-5">
          {lowStock.map((medicine) => (
            <li key={medicine._id} className="text-black mb-2">
              {medicine.name} - {medicine.stock} items left
            </li>
          ))}
        </ul>
        {lowStock.length === 0 && (
          <p className="text-black">No low stock medicines.</p>
        )}
      </div>

    </div>
  );
}

