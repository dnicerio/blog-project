// Imports
const express = require('express');

// Express App
const app = express();

// Register View Engine
app.set('view engine', 'ejs');

// Listen for HTTP requests
app.listen(3000);

// Send matching HTML file on HTTP response
app.get('/', (req, res) => {
  res.sendFile('./views/index.html', { root: __dirname });
})

app.get('/about', (req, res) => {
  res.sendFile('./views/about.html', { root: __dirname });
})

// Redirects
app.get('/about-me', (req, res) => {
  res.redirect('/about');
})

// 404 Page
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
})
