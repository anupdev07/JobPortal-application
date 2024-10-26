// app.js
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Initialize app and load environment variables
const app = express();
dotenv.config();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse URL-encoded form data (for form submissions)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Import routes and controllers
const authRoutes = require('./routes/auth'); // For handling registration and login
const authController = require('./controllers/authController'); // Contains registration and login logic

// Routes to render registration and login forms
app.get('/register', (req, res) => {
  res.render('register'); // Renders the register.ejs form
});

app.get('/login', (req, res) => {
  res.render('login'); // Renders the login.ejs form
});

// Routes to handle form submissions for registration and login
app.use('/auth', authRoutes); // Routes for handling auth actions (register and login)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
