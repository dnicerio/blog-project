// Imports
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// Express App
const app = express();

// Connect to MongoDB
const dbURI = 'mongodb+srv://dnicerio:HOTCAKE123@blog-project.9ey8o.mongodb.net/blog-project?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Register View Engine
app.set('view engine', 'ejs');

// Express static files
app.use(express.static('public'));

// Morgan HTTP Request Logger
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
})

// Blog routes
app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'Home', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog' });
})

// 404 Page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
})
