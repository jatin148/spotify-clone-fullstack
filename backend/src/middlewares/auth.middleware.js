const jwt = require("jsonwebtoken");

function verifyToken(req, res) {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: "Unauthorised" });
        return null;
    }

    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        res.status(401).json({ message: "Unauthorised" });
        return null;
    }
}

async function authArtist(req, res, next) {
    const decoded = verifyToken(req, res);
    if (!decoded) return;

    if (decoded.role !== "artist") {
        return res.status(403).json({ message: "You don't have access" });
    }

    req.user = decoded;
    next();
}

async function authUser(req,res,next) {
    const decoded = verifyToken(req, res);
    if (!decoded) return;

    if (decoded.role !== "user" && decoded.role !== "artist") {
        return res.status(403).json({ message: "You don't have access" });
    }

    req.user = decoded;
    next();
}

module.exports = {authArtist,authUser};