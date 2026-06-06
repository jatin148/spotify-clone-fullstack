import { Play, Pause, Volume2 } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";

export default function Player() {
    const { currentSong, isPlaying, progress, togglePlay, seek } = usePlayer();

    if (!currentSong) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-spotify-dark border-t border-spotify-card px-6 py-3 flex items-center gap-6 z-50">
            {/* Song Info */}
            <div className="flex items-center gap-3 w-64">
                <img
                    src={currentSong.coverImage || "https://placehold.co/48x48/282828/1DB954?text=🎵"}
                    alt={currentSong.title}
                    className="w-12 h-12 rounded object-cover"
                />
                <div>
                    <p className="text-white text-sm font-semibold truncate">{currentSong.title}</p>
                    <p className="text-spotify-light text-xs truncate">{currentSong.artist?.username}</p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex-1 flex flex-col items-center gap-2">
                <button
                    onClick={togglePlay}
                    className="bg-white text-black rounded-full p-2 hover:scale-105 transition"
                >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => seek(e.target.value)}
                    className="w-full accent-spotify-green"
                />
            </div>

            {/* Volume icon */}
            <div className="w-64 flex justify-end">
                <Volume2 className="text-spotify-light" size={20} />
            </div>
        </div>
    );
}