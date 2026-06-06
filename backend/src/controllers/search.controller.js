const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const userModel = require("../models/user.models");

async function search(req, res) {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ message: "Search query is required" });
        }

        // Case-insensitive search using regex
        const regex = new RegExp(q, "i");

        // Search all three in parallel for speed
        const [music, albums, artists] = await Promise.all([
            musicModel
                .find({ title: regex })
                .populate("artist", "username email")
                .limit(10),

            albumModel
                .find({ title: regex })
                .populate("artist", "username email")
                .limit(10),

            userModel
                .find({ username: regex, role: "artist" })
                .select("username email")
                .limit(10),
        ]);

        res.status(200).json({
            message: "Search results fetched successfully",
            results: {
                music,
                albums,
                artists,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = { search };