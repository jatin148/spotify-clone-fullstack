const express = require('express');
const authContoller = require("../controllers/auth.controller");

const router = express.Router();

router.post('/register', authContoller.registerUser)

router.post('/login', authContoller.loginUser)

router.post('/logout', authContoller.logoutUser)



module.exports = router;