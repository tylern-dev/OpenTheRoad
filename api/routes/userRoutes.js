const express = require('express');
const User = require('../models/UserSchema');
// const userController = require('../controllers/userController');
// const authCheck = require('../middleware/authCheck');
const authController = require('../controllers/userController');

const router = express.Router();

router.get('/user', authController.userInfo);

router.put('/user', authController.user_event_signup );
router.put('/updateProfile', authController.updateUserProfile);

router.post('/search', authController.searchUser);

module.exports = router;
