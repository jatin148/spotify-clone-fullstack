import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", email: "", password: "", role: "user" });
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await register(form);
            toast.success("Account created successfully!");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-spotify-black flex items-center justify-center">
            <div className="bg-spotify-dark p-10 rounded-xl w-full max-w-md">
                <h1 className="text-spotify-green text-3xl font-bold text-center mb-2">🎵 Spotify</h1>
                <h2 className="text-white text-xl font-semibold text-center mb-8">Create an account</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        className="bg-spotify-card text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-spotify-green"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="bg-spotify-card text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-spotify-green"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="bg-spotify-card text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-spotify-green"
                        required
                    />
                    <select
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="bg-spotify-card text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-spotify-green"
                    >
                        <option value="user">User</option>
                        <option value="artist">Artist</option>
                    </select>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-spotify-green text-black font-bold py-3 rounded-full hover:scale-105 transition disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-spotify-light text-center mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-white underline hover:text-spotify-green">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}