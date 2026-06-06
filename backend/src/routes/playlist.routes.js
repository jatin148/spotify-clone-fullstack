const express = require("express");
const playlistController = require("../controllers/playlist.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware.authUser, playlistController.createPlaylist);
router.get("/", authMiddleware.authUser, playlistController.getMyPlaylists);
router.get("/:playlistId", authMiddleware.authUser, playlistController.getPlaylistById);
router.post("/:playlistId/add", authMiddleware.authUser, playlistController.addMusicToPlaylist);
router.post("/:playlistId/remove", authMiddleware.authUser, playlistController.removeMusicFromPlaylist);
router.delete("/:playlistId", authMiddleware.authUser, playlistController.deletePlaylist);

module.exports = router;