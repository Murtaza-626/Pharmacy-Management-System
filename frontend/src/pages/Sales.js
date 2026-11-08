import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, cleaCart } from "../redux/cartSlice";

export default function Sales() {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const [medicineName, setMedicineName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    const handleAddToCart = (e) => {
        e.preventDefault();

        const newItem = {
            id: Date.now(),
            medicineName,
            quantity: parseInt(quantity),
            price: parseFloat(price),
            total: parseInt(quantity) * parseFloat(price)
        }
        dispatch(addToCart(newItem));
        setMedicineName("");
        setQuantity("");
        setPrice("");
    };

    const handleCheckout = () => {
        console.log("Checkout Completed");
        dispatch(cleaCart());
    }

    const calculateGrandTotal = () => {
        return cart.reduce((total, item) => total + item.total, 0);
    };


    return (
        <div className="p-8">
            <h1 className="ext-black text-3xl font-bold mb-6">Sales Management</h1>

            <div className="bg-white p-6 shadow mb-8">
                <h2 className="text-black text-xl font-bold mb-4">Record New Sale</h2>
                <form onSubmit={handleAddToCart} className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <input type="text" placeholder="Medicine Name" value={medicineName}
                        onChange={(e) => setMedicineName(e.target.value)}
                        className="border border-black p-2 rounded text-black" required />

                    <input type="number" placeholder="Quantity" value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="border border-black p-2 rounded text-black" required />

                    <input type="number" placeholder="Price per Unit" value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border border-black p-2 rounded text-black" required />

                    <button type="submit" className="bg-blue-600 text-white p-2 rounded md:col-span-3">
                        Add to Bill
                    </button>

                </form>
            </div>

            <div className="bg-white p-6 shadow">
                <h2 className="text-black text-xl font-bold mb-4">Current Bill</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-100 text-black">
                                <th className="p-2 border border-black">Medicine Name</th>
                                <th className="p-2 border border-black">Quantity</th>
                                <th className="p-2 border border-black">Unit Price</th>
                                <th className="p-2 border border-black">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id} className="text-black">
                                    <td className="p-2 border border-black">{item.medicineName}</td>
                                    <td className="p-2 border border-black">{item.quantity}</td>
                                    <td className="p-2 border border-black">{item.price}</td>
                                    <td className="p-2 border border-black">{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {cart.length === 0 && (
                        <p className="text-black mt-4 text-center">No Item added to the bill yet.</p>
                    )}

                    {cart.length > 0 && (
                        <div className="mt-6 flex flex-col items-end">
                            <p className="text-black text-2xl font-bold mb-4">
                                Grand Total: {calculateGrandTotal()}
                            </p>
                            <button onClick={handleCheckout}
                                className="bg-green-600 text-white px-6 py-2 rounded text-lg font-bold">
                                Complete Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}