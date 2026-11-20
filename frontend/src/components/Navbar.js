import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
    const navigate = useNavigate();

    // remove the saved token and send the user back to login
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="bg-blue-600 p-4 text-white flex gap-4">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/inventory">Inventory</Link>
            <Link to="/sales">Sales</Link>
            <Link to="/">Login</Link>
            <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded ml-auto">
                Logout
            </button>
        </nav>
    );
}