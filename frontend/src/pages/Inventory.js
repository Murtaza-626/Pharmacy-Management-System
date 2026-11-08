import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMedicine, deleteMedicines } from "../redux/medicineSlice";

export default function Inventory() {
    const medicines = useSelector((state) => state.medicine.medicines);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [expiry, setExpiry] = useState("");

    const handleMedicine = (e) => {
        e.preventDefault();

        const newMedicine = {
            id: Date.now(),
            name, category, manufacturer, price, stock, expiry
        }
        // Sending new medicine to the store
        dispatch(addMedicine(newMedicine));

        setName("");
        setCategory("");
        setManufacturer("");
        setPrice("");
        setExpiry("");
        setStock("");
    }

    const handleDelete = (id) => {
        dispatch(deleteMedicines(id));
    }

    const handleUpdate = (id) => {
        console.log("Update medicine functionality will connect to backend here for id:", id);
    };

    return (
        <div className="p-8">
            <h1 className="text-black text-3xl font-bold mb-6">Inventory Management</h1>
            <div className="bg-white p-6 shadow mb-8">
                <h2 className="text-black text-xl font-bold mb-4">Add New Medicine</h2>

                <form onSubmit={handleMedicine} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <input type="text" placeholder="Medicine Name"
                        value={name} onChange={(e) => setName(e.target.value)}
                        className="border border-black p-2 rounded text-black"
                        required
                    />

                    <input type="text" placeholder="Category"
                        value={category} onChange={(e) => setCategory(e.target.value)}
                        className="border border-black p-2 rounded text-black"
                        required
                    />

                    <input type="text" placeholder="Manufacturer"
                        value={manufacturer} onChange={(e) => setManufacturer(e.target.value)}
                        className="border border-black p-2 rounded text-black"
                        required
                    />

                    <input type="number" placeholder="Price"
                        value={price} onChange={(e) => setPrice(e.target.value)}
                        className="border border-black p-2 rounded text-black"
                        required
                    />

                    <input type="number" placeholder="Stock Quantity"
                        value={stock} onChange={(e) => setStock(e.target.value)}
                        className="border border-black p-2 rounded text-black"
                        required
                    />

                    <input type="date"
                        value={expiry} onChange={(e) => setExpiry(e.target.value)}
                        className="border border-black p-2 rounded text-black"
                        required
                    />

                    <button type="submit" className="bg-blue-600 text-white p-2 rounded md:col-span-2">
                        Add Medicine
                    </button>

                </form>
            </div>

            <div className="bg-white p-6 shadow">
                <h2 className="text-black text-xl font-bold mb-4">Medicine Records</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-100 text-black">
                                <th className="p-2 border border-black">Name</th>
                                <th className="p-2 border border-black">Category</th>
                                <th className="p-2 border border-black">Manufacturer</th>
                                <th className="p-2 border border-black">Price</th>
                                <th className="p-2 border border-black">Stock</th>
                                <th className="p-2 border border-black">Expiry</th>
                                <th className="p-2 border border-black">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicines.map((medicine) => (
                                <tr key={medicine.id} className="text-black">
                                    <td className="p-2 border border-black">{medicine.name}</td>
                                    <td className="p-2 border border-black">{medicine.category}</td>
                                    <td className="p-2 border border-black">{medicine.manufacturer}</td>
                                    <td className="p-2 border border-black">{medicine.price}</td>
                                    <td className="p-2 border border-black">{medicine.stock}</td>
                                    <td className="p-2 border border-black">{medicine.expiry}</td>
                                    <td className="p-2 border border-black flex gap-2">
                                        <button onClick={() => handleUpdate(medicine.id)}
                                            className="bg-green-600 text-white px-3 py-1 rounded">
                                            Update
                                        </button>

                                        <button onClick={() => handleDelete(medicine.id)}
                                            className="bg-green-600 text-white px-3 py-1 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {medicines.length === 0 && (
                        <p className="text-black mt-4 text-center">No Medicines Added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}