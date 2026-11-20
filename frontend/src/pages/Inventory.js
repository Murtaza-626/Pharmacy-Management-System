import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMedicines } from "../redux/medicineSlice";
import api from "../api"
export default function Inventory() {
    const medicines = useSelector((state) => state.medicine.medicines);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [expiry, setExpiry] = useState("");
    const [editId, setEditId] = useState(null);

    const loadMedicines = async () => {
        try {
            const res = await api.get("/medicines");
            dispatch(setMedicines(res.data));
        }
        catch (error) {

        }
    };

    useEffect(() => {
        if (token) {
            loadMedicines();
        }
    }, []);

    const handleMedicine = async (e) => {
        e.preventDefault();

        const newMedicine = {
            name, category, manufacturer, price, stock, expiryDate: expiry
        };

        try {
            // if we are editing update, otherwise add a new one
            if (editId) {
                await api.put("/medicines/" + editId, newMedicine);
            }
            else {
                await api.post("/medicines", newMedicine);
            }
        } catch (error) {
            alert(error.response ? error.response.data.message : "Something went wrong");
            return;
        }

        loadMedicines();

        setName("");
        setCategory("");
        setManufacturer("");
        setPrice("");
        setExpiry("");
        setStock("");
        setEditId(null);
    }

    const handleDelete = async (id) => {
        await api.delete("/medicines/" + id);
        loadMedicines();
    }

    const handleUpdate = (medicine) => {
        setName(medicine.name);
        setStock(medicine.stock);
        setCategory(medicine.category);
        setManufacturer(medicine.manufacturer);
        setExpiry(medicine.expiry);
        setPrice(medicine.price);
        setEditId(medicine.editId);
    };

    if (!token) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-black text-2xl font-bold">Please login or register first</h1>
            </div>
        );
    }

    if (!token) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <h1 className="text-green-800 text-2xl font-bold">Please login or register first</h1>
        </div>
    );
}

return (
    <div className="p-8 min-h-screen bg-green-50">
        <h1 className="text-green-800 text-3xl font-bold mb-6">Inventory Management</h1>
        <div className="bg-white p-6 shadow-md rounded-lg border border-green-100 mb-8">
            <h2 className="text-green-700 text-xl font-bold mb-4">Add New Medicine</h2>

            <form onSubmit={handleMedicine} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input type="text" placeholder="Medicine Name"
                    value={name} onChange={(e) => setName(e.target.value)}
                    className="border border-green-300 p-2 rounded text-black"
                    required
                />

                <input type="text" placeholder="Category"
                    value={category} onChange={(e) => setCategory(e.target.value)}
                    className="border border-green-300 p-2 rounded text-black"
                    required
                />

                <input type="text" placeholder="Manufacturer"
                    value={manufacturer} onChange={(e) => setManufacturer(e.target.value)}
                    className="border border-green-300 p-2 rounded text-black"
                    required
                />

                <input type="number" placeholder="Price"
                    value={price} onChange={(e) => setPrice(e.target.value)}
                    className="border border-green-300 p-2 rounded text-black"
                    required
                />

                <input type="number" placeholder="Stock Quantity"
                    value={stock} onChange={(e) => setStock(e.target.value)}
                    className="border border-green-300 p-2 rounded text-black"
                    required
                />

                <input type="date" placeholder="Expiry Date"
                    value={expiry} onChange={(e) => setExpiry(e.target.value)}
                    className="border border-green-300 p-2 rounded text-black"
                    required
                />

                <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700 md:col-span-2">
                    Add Medicine
                </button>

            </form>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg border border-green-100">
            <h2 className="text-green-700 text-xl font-bold mb-4">Medicine Records</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-green-100 text-black">
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
                                <td className="p-2 border border-black">{medicine.expiryDate}</td>
                                <td className="p-2 border border-black flex gap-2">
                                    <button onClick={() => handleUpdate(medicine)}
                                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                                        Update
                                    </button>

                                    <button onClick={() => handleDelete(medicine._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
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