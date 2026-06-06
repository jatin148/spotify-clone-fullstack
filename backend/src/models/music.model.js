const mongoose = require("mongoose");




const musicSchema = new mongoose.Schema({
    uri: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "album",
        default: null,
    },
    duration: {
        type: Number,
        default: 0,
    },
    coverImage: {
        type: String,
        default: null,
    }
},{ timestamps: true });

const musicModel = mongoose.model("music", musicSchema)

module.exports = musicModel;