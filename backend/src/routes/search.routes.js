const express = require("express");
const searchController = require("../controllers/search.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Example: GET /api/search?q=shape+of+you
router.get("/", authMiddleware.authUser, searchController.search);

module.exports = router;