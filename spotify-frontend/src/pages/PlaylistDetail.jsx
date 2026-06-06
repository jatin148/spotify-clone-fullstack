import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { usePlayer } from "../context/PlayerContext";
import { Play, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function PlaylistDetail() {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const { playSong } = usePlayer();

    useEffect(() => {
        async function fetchPlaylist() {
            try {
                const res = await axios.get(`/playlists/${playlistId}`);
                setPlaylist(res.data.playlist);
            } catch (err) {
                toast.error("Failed to fetch playlist");
            }
        }
        fetchPlaylist();
    }, [playlistId]);

    async function removeSong(musicId) {
        try {
            await axios.post(`/playlists/${playlistId}/remove`, { musicId });
            setPlaylist({
                ...playlist,
                music: playlist.music.filter((s) => s._id !== musicId),
            });
            toast.success("Song removed");
        } catch (err) {
            toast.error("Failed to remove song");
        }
    }

    if (!playlist) return <div className="ml-64 p-8 text-spotify-light">Loading...</div>;

    return (
        <div className="ml-64 p-8 pb-28">
            <h1 className="text-white text-3xl font-bold mb-2">{playlist.title}</h1>
            <p className="text-spotify-light mb-8">{playlist.music.length} songs</p>

            {playlist.music.length === 0 ? (
                <p className="text-spotify-light">No songs in this playlist yet.</p>
            ) : (
                <div className="flex flex-col gap-2">
                    {playlist.music.map((song, index) => (
                        <div
                            key={song._id}
                            className="flex items-center gap-4 bg-spotify-card hover:bg-spotify-light/20 p-3 rounded-lg group"
                        >
                            <span className="text-spotify-light w-6 text-center">{index + 1}</span>
                            <img
                                src={song.coverImage || "https://placehold.co/48x48/282828/1DB954?text=🎵"}
                                alt={song.title}
                                className="w-12 h-12 rounded object-cover"
                            />
                            <div className="flex-1">
                                <p className="text-white font-semibold">{song.title}</p>
                                <p className="text-spotify-light text-sm">{song.artist?.username}</p>
                            </div>
                            <button
                                onClick={() => playSong({ ...song, id: song._id })}
                                className="text-spotify-light hover:text-spotify-green opacity-0 group-hover:opacity-100 transition"
                            >
                                <Play size={18} />
                            </button>
                            <button
                                onClick={() => removeSong(song._id)}
                                className="text-spotify-light hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
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