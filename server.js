// server.js
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');

const userRoutes = require('./routes/userRoutes');

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
app.use('/users', userRoutes);

// Define route handler for the root URL
app.get('/', (req, res) => {
  res.render('home', { loggedIn: !!req.session.userId });
});

// Define route handler for the dashboard URL
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// Define route handler for creating a new post
app.post('/create', postController.createPost);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
