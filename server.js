const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const userController = require('./controllers/userController');

const app = express();
const port = 3001;

// Configure Express to use Handlebars as the template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Configure express-session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Routes

// Define route handler for the root URL
app.get('/', (req, res) => {
  res.render('home', { loggedIn: !!req.session.userId });
});

// Define route handler for the dashboard URL
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// POST route for user sign-in
app.post('/users/signin', userController.signInUser);

// POST route for user sign-up
app.post('/users/signup', userController.signUpUser);

// GET route for user logout
app.get('/logout', (req, res) => {
  // Clear the user session
  req.session.destroy((error) => {
    if (error) {
      console.error('Failed to destroy session:', error);
      res.status(500).send('An error occurred');
    } else {
      // Redirect the user to the home page and refresh the page
      res.setHeader('Refresh', '0');
      res.redirect('/');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
