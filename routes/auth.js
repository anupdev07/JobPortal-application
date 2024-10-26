const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

//this is registration route
router.post('/register', uploadMiddleware, authController.register);
//login route
router.post('/login', authController.login);

module.exports = router;