import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Plus, Trash2, Music } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Playlists() {
    const [playlists, setPlaylists] = useState([]);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlaylists();
    }, []);

    async function fetchPlaylists() {
        try {
            const res = await axios.get("/playlists");
            setPlaylists(res.data.playlists);
        } catch (err) {
            toast.error("Failed to fetch playlists");
        } finally {
            setLoading(false);
        }
    }

    async function createPlaylist(e) {
        e.preventDefault();
        if (!title.trim()) return;
        try {
            const res = await axios.post("/playlists", { title });
            setPlaylists([...playlists, res.data.playlist]);
            setTitle("");
            toast.success("Playlist created!");
        } catch (err) {
            toast.error("Failed to create playlist");
        }
    }

    async function deletePlaylist(id) {
        try {
            await axios.delete(`/playlists/${id}`);
            setPlaylists(playlists.filter((p) => p._id !== id));
            toast.success("Playlist deleted");
        } catch (err) {
            toast.error("Failed to delete playlist");
        }
    }

    return (
        <div className="ml-64 p-8 pb-28">
            <h1 className="text-white text-3xl font-bold mb-8">My Playlists</h1>

            {/* Create Playlist */}
            <form onSubmit={createPlaylist} className="flex gap-3 mb-10">
                <input
                    type="text"
                    placeholder="New playlist name..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-spotify-card text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-spotify-green flex-1"
                />
                <button
                    type="submit"
                    className="bg-spotify-green text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition flex items-center gap-2"
                >
                    <Plus size={18} /> Create
                </button>
            </form>

            {loading ? (
                <p className="text-spotify-light">Loading playlists...</p>
            ) : playlists.length === 0 ? (
                <p className="text-spotify-light">No playlists yet. Create one above!</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {playlists.map((playlist) => (
                        <div key={playlist._id} className="bg-spotify-card p-4 rounded-lg group relative">
                            <Link to={`/playlists/${playlist._id}`}>
                                <div className="w-full aspect-square bg-spotify-black rounded-md flex items-center justify-center text-4xl mb-4">
                                    🎵
                                </div>
                                <p className="text-white font-semibold truncate">{playlist.title}</p>
                                <p className="text-spotify-light text-sm">{playlist.music?.length || 0} songs</p>
                            </Link>
                            <button
                                onClick={() => deletePlaylist(playlist._id)}
                                className="absolute top-3 right-3 text-spotify-light hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}