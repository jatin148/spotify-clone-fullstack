import { createContext, useContext, useRef, useState } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(new Audio());

    function playSong(song) {
        if (currentSong?.id === song.id) {
            togglePlay();
            return;
        }
        audioRef.current.src = song.uri;
        audioRef.current.play();
        setCurrentSong(song);
        setIsPlaying(true);

        audioRef.current.ontimeupdate = () => {
            const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(pct || 0);
        };
    }

    function togglePlay() {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    function seek(value) {
        audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
        setProgress(value);
    }

    return (
        <PlayerContext.Provider value={{ currentSong, isPlaying, progress, playSong, togglePlay, seek }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    return useContext(PlayerContext);
}