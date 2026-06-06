require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./db/db");
const userModel = require("./models/user.models");
const musicModel = require("./models/music.model");
const albumModel = require("./models/album.model");

const defaultArtist = {
    username: "SpotifyOfficial",
    email: "official@spotify.com",
    password: "spotify123",
    role: "artist",
};

const defaultSongs = [
    {
        title: "Blinding Lights",
        uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        coverImage: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
        duration: 200,
    },
    {
        title: "Save Your Tears",
        uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        coverImage: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
        duration: 215,
    },
    {
        title: "Starboy",
        uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a",
        duration: 230,
    },
    {
        title: "Die For You",
        uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a",
        duration: 260,
    },
    {
        title: "Levitating",
        uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946",
        duration: 203,
    },
    {
        title: "Physical",
        uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946",
        duration: 193,
    },
    {
        title: "Peaches",
        uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        coverImage: "https://i.scdn.co/image/ab67616d0000b2739e495fb707973f3390850eea",
        duration: 198,
    },
    {
        title: "Stay",
        uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        coverImage: "https://i.scdn.co/image/ab67616d0000b2739e495fb707973f3390850eea",
        duration: 198,
    },
    {
        title: "As It Was",
        uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        coverImage: "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f0",
        duration: 167,
    },
    {
        title: "Watermelon Sugar",
        uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        coverImage: "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f0",
        duration: 174,
    },
    {
        title: "Heat Waves",
        uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647",
        duration: 238,
    },
    {
        title: "Flowers",
        uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273f429549123dbe8552764ba1d",
        duration: 200,
    },
];

const defaultAlbums = [
    {
        title: "After Hours",
        coverImage: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
        songIndices: [0, 1, 2, 3],
    },
    {
        title: "Future Nostalgia",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946",
        songIndices: [4, 5],
    },
    {
        title: "Justice",
        coverImage: "https://i.scdn.co/image/ab67616d0000b2739e495fb707973f3390850eea",
        songIndices: [6, 7],
    },
    {
        title: "Harry's House",
        coverImage: "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f0",
        songIndices: [8, 9],
    },
    {
        title: "Dreamland",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647",
        songIndices: [10],
    },
    {
        title: "Endless Summer Vacation",
        coverImage: "https://i.scdn.co/image/ab67616d0000b273f429549123dbe8552764ba1d",
        songIndices: [11],
    },
];

async function seed() {
    await connectDB();

    console.log("🌱 Starting seed...");

    // Clear existing data
    await userModel.deleteMany({});
    await musicModel.deleteMany({});
    await albumModel.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Create artist
    const hash = await bcrypt.hash(defaultArtist.password, 10);
    const artist = await userModel.create({ ...defaultArtist, password: hash });
    console.log("👤 Artist created:", artist.username);

    // Create songs
    const createdSongs = await Promise.all(
        defaultSongs.map((song) =>
            musicModel.create({ ...song, artist: artist._id })
        )
    );
    console.log(`🎵 ${createdSongs.length} songs created`);

    // Create albums
    await Promise.all(
        defaultAlbums.map((album) =>
            albumModel.create({
                title: album.title,
                coverImage: album.coverImage,
                artist: artist._id,
                music: album.songIndices.map((i) => createdSongs[i]._id),
            })
        )
    );
    console.log(`💿 ${defaultAlbums.length} albums created`);

    console.log("✅ Seed complete!");
    console.log("----------------------------------");
    console.log("🎤 Artist login credentials:");
    console.log("   Email:    official@spotify.com");
    console.log("   Password: spotify123");
    console.log("----------------------------------");

    mongoose.disconnect();
}

seed().catch((err) => {
    console.error("Seed failed:", err);
    mongoose.disconnect();
});