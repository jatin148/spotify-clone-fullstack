import { useEffect, useState } from "react";
import axios from "../api/axios";
import SongCard from "../components/SongCard";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Home() {
    const [music, setMusic] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [musicRes, albumsRes] = await Promise.all([
                    axios.get("/music"),
                    axios.get("/music/albums"),
                ]);
                setMusic(musicRes.data.music);
                setAlbums(albumsRes.data.albums);
            } catch (err) {
                toast.error("Failed to fetch music");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return (
        <div className="ml-64 p-8 flex items-center justify-center h-screen">
            <p className="text-spotify-light text-lg">Loading...</p>
        </div>
    );

    return (
        <div className="ml-64 p-8 pb-28">
            <h1 className="text-white text-3xl font-bold mb-8">Good evening 👋</h1>

            {/* Albums Section */}
            {albums.length > 0 && (
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-white text-xl font-bold">Featured Albums</h2>
                        <Link to="/albums" className="text-spotify-light text-sm hover:text-white transition">
                            Show all
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {albums.map((album) => (
                            <Link
                                to={`/albums/${album._id}`}
                                key={album._id}
                                className="bg-spotify-card hover:bg-spotify-light/20 p-4 rounded-lg cursor-pointer transition group"
                            >
                                <div className="relative mb-4">
                                    <img
                                        src={album.coverImage || "https://placehold.co/200x200/282828/1DB954?text=💿"}
                                        alt={album.title}
                                        className="w-full aspect-square object-cover rounded-md shadow-lg"
                                    />
                                </div>
                                <p className="text-white font-semibold truncate">{album.title}</p>
                                <p className="text-spotify-light text-sm truncate">{album.artist?.username}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Songs Section */}
            {music.length > 0 && (
                <section>
                    <h2 className="text-white text-xl font-bold mb-4">All Songs</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {music.map((song) => (
                            <SongCard key={song._id} song={{ ...song, id: song._id }} />
                        ))}
                    </div>
                </section>
            )}

            {music.length === 0 && albums.length === 0 && (
                <p className="text-spotify-light">No music found.</p>
            )}
        </div>
    );
}