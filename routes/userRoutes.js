const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST route for user sign-in
router.post('/signin', userController.signInUser);

// Export the router
module.exports = router;
