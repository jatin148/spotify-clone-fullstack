import { Play, Pause } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";

export default function SongCard({ song }) {
    const { currentSong, isPlaying, playSong } = usePlayer();
    const isActive = currentSong?.id === song.id;

    return (
        <div
            onClick={() => playSong(song)}
            className="bg-spotify-card hover:bg-spotify-light/20 p-4 rounded-lg cursor-pointer transition group"
        >
            <div className="relative mb-4">
                <img
                    src={song.coverImage || "https://placehold.co/200x200/282828/1DB954?text=🎵"}
                    alt={song.title}
                    className="w-full aspect-square object-cover rounded-md"
                />
                <button className="absolute bottom-2 right-2 bg-spotify-green text-black rounded-full p-2 opacity-0 group-hover:opacity-100 transition shadow-lg">
                    {isActive && isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
            </div>
            <p className={`font-semibold truncate ${isActive ? "text-spotify-green" : "text-white"}`}>
                {song.title}
            </p>
            <p className="text-spotify-light text-sm truncate">{song.artist?.username}</p>
        </div>
    );
}