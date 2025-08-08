import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <Link to="/" className="text-lg font-bold">
                MyApp
            </Link>
            <Link to="/products">Products</Link>
            {user ? (
                <div className="flex items-center gap-4">
                    <span className="font-semibold">Hi, {user.name}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="flex gap-4">
                    <Link
                        to="/login"
                        className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/register"
                        className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </nav>
    );
}
