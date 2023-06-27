const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const postController = require('./controllers/postController');

const app = express();
const port = 3001;

// Set up session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  })
);

// Set up view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// Set up body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up static directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/users', userRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('home');
});

// Dashboard route
app.get('/dashboard', (req, res) => {
  // Check if the user is logged in
  if (!req.session.userId) {
    return res.redirect('/');
  }
  // Render the dashboard with the user's data
  res.render('dashboard', { userId: req.session.userId });
});

// Logout route
app.get('/logout', (req, res) => {
  // Clear the user session
  req.session.destroy((error) => {
    if (error) {
      console.error('Failed to destroy session:', error);
    }
    // Redirect the user to the home page
    res.redirect('/');
  });
});

app.post('/posts', postController.createPost); // Handle form submission

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
