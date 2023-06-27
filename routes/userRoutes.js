const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST route for user sign-in
router.post('/signin', userController.signInUser);

// GET route for user logout
router.get('/logout', userController.logoutUser);

// Export the router
module.exports = router;
