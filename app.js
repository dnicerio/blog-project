// Imports
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const blogRoutes = require('./routes/blogRoutes');

// Express
const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB Atlas
const dbURI = 'mongodb+srv://dnicerio:HOTCAKE123@blog-project.9ey8o.mongodb.net/blog-project?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGODB_URI || dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

// Register View Engine
app.set('view engine', 'ejs');

// Express middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Morgan HTTP Request Logger
app.use(morgan('dev'));

// Home redirect
app.get('/', (req, res) => {
  res.redirect('/blogs');
})

// About Page
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
})

// Blog Routes
app.use('/blogs',blogRoutes);

// 404 Page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
})
