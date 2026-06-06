const {ImageKit} = require("@imagekit/nodejs")


const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

async function uploadFile(file) {
    try{
    const result = await ImageKitClient.files.upload({
        file,
        fileName: "music_" + Date.now(),
        folder: "spotify backend/music"
    });

    return result;
} catch(error) {
        throw new Error("File upload failed: " + error.message);
    }
}

module.exports = {uploadFile};