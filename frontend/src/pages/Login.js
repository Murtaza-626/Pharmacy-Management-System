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
        <div className="p-8 flex flex-col items-center">
            <h1 className="text-black text-2xl font-bold">Login</h1>
            <form onSubmit={handleLogin} className="mt-4 flex flex-col gap-4 w-full max-w-sm">

                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="border border-black p-2 rounded" required />

                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="border border-black p-2 rounded" required />

                <button type="submit" className="bg-blue-600 text-white p-2 rounded">Login</button>

            </form>
            <p className="mt-4 text-black">
                Do not have an account?
                <Link to="/register" className="text-blue-600">Register here</Link>
            </p>
        </div>
    );
}