import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import api from "../api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/users/login", { email, password });
            localStorage.setItem("token", res.data.token);
            dispatch(setUser(res.data));
            navigate("/dashboard");
        }
        catch (error) {
            alert(error.response ? error.response.data.message : "Server not reachable");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm border border-green-100">
                <h1 className="text-green-800 text-3xl font-bold text-center mb-6">Pharmacy Login</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">

                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="border border-green-300 p-2 rounded" required />

                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="border border-green-300 p-2 rounded" required />

                    <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700">Login</button>

                </form>
                <p className="mt-4 text-black text-center">
                    Do not have an account?
                    <Link to="/register" className="text-green-700"> Register here</Link>
                </p>
            </div>
        </div>
    );
}