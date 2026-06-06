const playlistModel = require("../models/playlist.model");

async function createPlaylist(req, res) {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const playlist = await playlistModel.create({
            title,
            user: req.user.id,
            music: [],
        });

        res.status(201).json({
            message: "Playlist created successfully",
            playlist,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function getMyPlaylists(req, res) {
    try {
        const playlists = await playlistModel
            .find({ user: req.user.id })
            .populate("music");

        res.status(200).json({
            message: "Playlists fetched successfully",
            playlists,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function getPlaylistById(req, res) {
    try {
        const playlist = await playlistModel
            .findById(req.params.playlistId)
            .populate("music")
            .populate("user", "username email");

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        res.status(200).json({
            message: "Playlist fetched successfully",
            playlist,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function addMusicToPlaylist(req, res) {
    try {
        const { musicId } = req.body;
        const { playlistId } = req.params;

        if (!musicId) {
            return res.status(400).json({ message: "musicId is required" });
        }

        const playlist = await playlistModel.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        if (playlist.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "You don't have access" });
        }

        if (playlist.music.includes(musicId)) {
            return res.status(409).json({ message: "Song already in playlist" });
        }

        playlist.music.push(musicId);
        await playlist.save();

        res.status(200).json({
            message: "Song added to playlist successfully",
            playlist,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function removeMusicFromPlaylist(req, res) {
    try {
        const { musicId } = req.body;
        const { playlistId } = req.params;

        const playlist = await playlistModel.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        if (playlist.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "You don't have access" });
        }

        playlist.music = playlist.music.filter(
            (id) => id.toString() !== musicId
        );
        await playlist.save();

        res.status(200).json({
            message: "Song removed from playlist successfully",
            playlist,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function deletePlaylist(req, res) {
    try {
        const playlist = await playlistModel.findById(req.params.playlistId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        if (playlist.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "You don't have access" });
        }

        await playlistModel.findByIdAndDelete(req.params.playlistId);

        res.status(200).json({ message: "Playlist deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = {
    createPlaylist,
    getMyPlaylists,
    getPlaylistById,
    addMusicToPlaylist,
    removeMusicFromPlaylist,
    deletePlaylist,
};