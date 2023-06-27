const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars').create(); // Update this line
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
app.engine('handlebars', exphbs.engine); // Use the engine from exphbs
app.set('view engine', 'handlebars');

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
app.get('/dashboard', postController.getPosts); // Retrieve posts and render dashboard view

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

app.post('/posts', postController.createPost); // Create a new post

app.set('views', path.join(__dirname, 'views'));

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
