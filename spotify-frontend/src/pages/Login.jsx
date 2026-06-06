import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await login(form);
            toast.success("Logged in successfully!");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-spotify-black flex items-center justify-center">
            <div className="bg-spotify-dark p-10 rounded-xl w-full max-w-md">
                <h1 className="text-spotify-green text-3xl font-bold text-center mb-2">🎵 Spotify</h1>
                <h2 className="text-white text-xl font-semibold text-center mb-8">Log in to continue</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-spotify-green text-black font-bold py-3 rounded-full hover:scale-105 transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <p className="text-spotify-light text-center mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-white underline hover:text-spotify-green">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}