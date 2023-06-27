const User = require('../models/User');
const bcrypt = require('bcrypt');

// Handle user sign-in
exports.signInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists in the database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.render('home', { error: 'Invalid email or password' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render('home', { error: 'Invalid email or password' });
    }

    // Successful sign-in
    req.session.userId = user.id;
    res.redirect('/dashboard'); // Replace with the dashboard route

  } catch (error) {
    console.error(error);
    res.render('home', { error: 'An error occurred' });
  }
};

exports.signUpUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    req.session.userId = user.id;
    res.redirect('/dashboard'); // Replace with the dashboard route
  } catch (error) {
    console.error(error);
    res.render('home', { error: 'An error occurred' });
  }
};

// Handle user logout
exports.logoutUser = (req, res) => {
  // Clear the user session
  req.session.destroy((error) => {
    if (error) {
      console.error('Failed to destroy session:', error);
    }
    // Redirect the user to the home page and refresh the page
    res.redirect('/');
    res.setHeader('Refresh', '0');
  });
};