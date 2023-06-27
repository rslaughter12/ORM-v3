const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

// POST route for user sign-in
router.post('/signin', userController.signInUser);

// GET route for user logout
router.get('/logout', userController.logoutUser);

// POST route for creating a post
router.post('/create', postController.createPost);

// Export the router
module.exports = router;
