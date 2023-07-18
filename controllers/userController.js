const { User } = require('../models');
const bcrypt = require('bcrypt');

// Handle user sign-in
exports.signInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists in the database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.json( { error: 'Invalid email or password' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json( { error: 'Invalid email or password' });
    }

    // Successful sign-in
    req.session.save(() => {
    req.session.userId = user.id; // Replace with the dashboard route
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.json({ error: 'An error occurred' });
  }
};

exports.signUpUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    req.session.save(() => {
    req.session.userId = user.id;
    });
    res.json(user); // Replace with the dashboard route
  } catch (error) {
    console.error(error);
    res.json({ error: 'An error occurred' });
  }
};

// Handle user logout
exports.logoutUser = (req, res) => {
  // Clear the user session
  req.session.destroy((error) => {
    if (error) {
      console.error('Failed to destroy session:', error);
    }
    // Redirect the user to the home page
    res.redirect('/');
  });
};