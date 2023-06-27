const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const userController = require('./controllers/userController');

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

app.post('/users/signup', userController.signUpUser);


// Routes
app.use('/users', userRoutes);
app.use(express.static('public'));

// Define route handler for the root URL
// Define route handler for the root URL
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
