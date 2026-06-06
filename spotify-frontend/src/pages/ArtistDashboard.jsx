import { useState } from "react";
import axios from "../api/axios";
import { Upload, Disc } from "lucide-react";
import toast from "react-hot-toast";

export default function ArtistDashboard() {
    const [songForm, setSongForm] = useState({ title: "", file: null });
    const [albumForm, setAlbumForm] = useState({ title: "" });
    const [songLoading, setSongLoading] = useState(false);
    const [albumLoading, setAlbumLoading] = useState(false);

    async function uploadSong(e) {
        e.preventDefault();
        if (!songForm.title || !songForm.file) {
            return toast.error("Title and file are required");
        }
        setSongLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", songForm.title);
            formData.append("music", songForm.file);
            await axios.post("/music/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            toast.success("Song uploaded successfully!");
            setSongForm({ title: "", file: null });
        } catch (err) {
            toast.error(err.response?.data?.message || "Upload failed");
        } finally {
            setSongLoading(false);
        }
    }

    async function createAlbum(e) {
        e.preventDefault();
        if (!albumForm.title) return toast.error("Title is required");
        setAlbumLoading(true);
        try {
            await axios.post("/music/album", albumForm);
            toast.success("Album created successfully!");
            setAlbumForm({ title: "" });
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create album");
        } finally {
            setAlbumLoading(false);
        }
    }

    return (
        <div className="ml-64 p-8 pb-28">
            <h1 className="text-white text-3xl font-bold mb-8">Artist Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Upload Song */}
                <div className="bg-spotify-card p-6 rounded-xl">
                    <h2 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                        <Upload size={20} className="text-spotify-green" /> Upload Song
                    </h2>
                    <form onSubmit={uploadSong} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Song title"
                            value={songForm.title}
                            onChange={(e) => setSongForm({ ...songForm, title: e.target.value })}
                            className="bg-spotify-black text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-spotify-green"
                            required
                        />
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => setSongForm({ ...songForm, file: e.target.files[0] })}
                            className="bg-spotify-black text-spotify-light px-4 py-3 rounded-md outline-none file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:bg-spotify-green file:text-black file:font-bold"
                            required
                        />
                        <button
                            type="submit"
                            disabled={songLoading}
                            className="bg-spotify-green text-black font-bold py-3 rounded-full hover:scale-105 transition disabled:opacity-50"
                        >
                            {songLoading ? "Uploading..." : "Upload Song"}
                        </button>
                    </form>
                </div>

                {/* Create Album */}
                <div className="bg-spotify-card p-6 rounded-xl">
                    <h2 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                        <Disc size={20} className="text-spotify-green" /> Create Album
                    </h2>
                    <form onSubmit={createAlbum} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Album title"
                            value={albumForm.title}
                            onChange={(e) => setAlbumForm({ ...albumForm, title: e.target.value })}
                            className="bg-spotify-black text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-spotify-green"
                            required
                        />
                        <button
                            type="submit"
                            disabled={albumLoading}
                            className="bg-spotify-green text-black font-bold py-3 rounded-full hover:scale-105 transition disabled:opacity-50"
                        >
                            {albumLoading ? "Creating..." : "Create Album"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}