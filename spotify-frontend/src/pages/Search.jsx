import { useState } from "react";
import axios from "../api/axios";
import SongCard from "../components/SongCard";
import { Search as SearchIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSearch(e) {
        e.preventDefault();
        if (!query.trim()) return;
        setLoading(true);
        try {
            const res = await axios.get(`/search?q=${query}`);
            setResults(res.data.results);
        } catch (err) {
            toast.error("Search failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="ml-64 p-8 pb-28">
            <h1 className="text-white text-3xl font-bold mb-8">Search</h1>

            <form onSubmit={handleSearch} className="flex gap-3 mb-8">
                <input
                    type="text"
                    placeholder="Search songs, albums, artists..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-spotify-card text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-spotify-green flex-1"
                />
                <button
                    type="submit"
                    className="bg-spotify-green text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition flex items-center gap-2"
                >
                    <SearchIcon size={18} /> Search
                </button>
            </form>

            {loading && <p className="text-spotify-light">Searching...</p>}

            {results && (
                <div className="flex flex-col gap-10">
                    {results.music.length > 0 && (
                        <div>
                            <h2 className="text-white text-xl font-semibold mb-4">Songs</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {results.music.map((song) => (
                                    <SongCard key={song._id} song={{ ...song, id: song._id }} />
                                ))}
                            </div>
                        </div>
                    )}

                    {results.artists.length > 0 && (
                        <div>
                            <h2 className="text-white text-xl font-semibold mb-4">Artists</h2>
                            <div className="flex gap-4">
                                {results.artists.map((artist) => (
                                    <div key={artist._id} className="bg-spotify-card p-4 rounded-lg text-center w-40">
                                        <div className="w-20 h-20 rounded-full bg-spotify-green flex items-center justify-center text-2xl mx-auto mb-3">
                                            🎤
                                        </div>
                                        <p className="text-white font-semibold">{artist.username}</p>
                                        <p className="text-spotify-light text-sm">Artist</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {results.music.length === 0 && results.artists.length === 0 && (
                        <p className="text-spotify-light">No results found for "{query}"</p>
                    )}
                </div>
            )}
        </div>
    );
}