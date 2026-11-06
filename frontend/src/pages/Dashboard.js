export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-black text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Summary cards for quick overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-blue-100 p-6 rounded shadow">
          <h2 className="text-black text-xl">Total Medicines</h2>
          <p className="text-blue-700 text-3xl font-bold mt-2">150</p>
        </div>
        
        <div className="bg-green-100 p-6 rounded shadow">
          <h2 className="text-black text-xl">Total Sales</h2>
          <p className="text-green-700 text-3xl font-bold mt-2">320</p>
        </div>
        
        <div className="bg-yellow-100 p-6 rounded shadow">
          <h2 className="text-black text-xl">Available Stock</h2>
          <p className="text-yellow-700 text-3xl font-bold mt-2">4500</p>
        </div>

      </div>

      {/* Low stock alerts section */}
      <div className="bg-red-50 p-6 rounded shadow">
        <h2 className="text-red-600 text-2xl font-bold mb-4">Low Stock Alerts</h2>
        <ul className="list-disc pl-5">
          <li className="text-black mb-2">Paracetamol - 10 items left</li>
          <li className="text-black mb-2">Amoxicillin - 5 items left</li>
          <li className="text-black mb-2">Vitamin C - 2 items left</li>
        </ul>
      </div>
      
    </div>
  );
}

