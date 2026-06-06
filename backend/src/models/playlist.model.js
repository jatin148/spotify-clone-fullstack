const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    music: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "music",
    }],
    coverImage: {
        type: String,
        default: null,
    }
}, { timestamps: true });

const playlistModel = mongoose.model("playlist", playlistSchema);

module.exports = playlistModel;