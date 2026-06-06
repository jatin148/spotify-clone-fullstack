import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Home, Search, ListMusic, LogOut, Upload } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        toast.success("Logged out successfully");
        navigate("/login");
    }

    return (
        <div className="w-64 bg-spotify-black h-screen flex flex-col p-6 fixed left-0 top-0">
            {/* Logo */}
            <h1 className="text-spotify-green text-2xl font-bold mb-10">🎵 Spotify</h1>

            {/* Nav Links */}
            <nav className="flex flex-col gap-4 flex-1">
                <Link to="/" className="flex items-center gap-3 text-spotify-light hover:text-white transition">
                    <Home size={20} /> Home
                </Link>
                <Link to="/search" className="flex items-center gap-3 text-spotify-light hover:text-white transition">
                    <Search size={20} /> Search
                </Link>
                <Link to="/playlists" className="flex items-center gap-3 text-spotify-light hover:text-white transition">
                    <ListMusic size={20} /> My Playlists
                </Link>
                {user?.role === "artist" && (
                    <Link to="/dashboard" className="flex items-center gap-3 text-spotify-light hover:text-white transition">
                        <Upload size={20} /> Artist Dashboard
                    </Link>
                )}
            </nav>

            {/* User Info */}
            {user && (
                <div className="border-t border-spotify-card pt-4">
                    <p className="text-white font-semibold">{user.username}</p>
                    <p className="text-spotify-light text-sm capitalize">{user.role}</p>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-spotify-light hover:text-white mt-3 transition"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            )}
        </div>
    );
}