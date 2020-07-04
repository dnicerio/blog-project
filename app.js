// Imports
const express = require('express');
const morgan = require('morgan');

// Express App
const app = express();

// Register View Engine
app.set('view engine', 'ejs');

// Listen for HTTP requests
app.listen(3000);

// Express static files
app.use(express.static('public'));

// Morgan HTTP Request Logger
app.use(morgan('dev'));

// Send matching HTML file on HTTP response
app.get('/', (req, res) => {
  const blogs = [
    {title: 'How to win in life', snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'},
    {title: 'When to get first car', snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'},
    {title: 'All your base are belong to us', snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'},
  ];
  res.render('index', { title: 'Home', blogs });
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog' });
})

// 404 Page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
})
