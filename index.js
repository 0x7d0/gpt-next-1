const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

// Set up routes
app.get('/', (req, res) => {
  res.send('This is the homepage');
});

app.get('/about', (req, res) => {
  res.send('This is the about page');
});

app.get('/contact', (req, res) => {
  res.send('This is the contact page');
});

app.get('/login', (req, res) => {
  res.send(`
    <form method="post" action="/login">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username"><br><br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password"><br><br>
      <input type="submit" value="Submit">
    </form>
  `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'ziggy' && password === 'ziggy123') {
    req.session.loggedIn = true;
    res.redirect('/admin');
  } else {
    res.send('Invalid username or password');
  }
});

app.get('/admin', (req, res) => {
  if (req.session.loggedIn) {
    res.send(`
      <h1>Welcome to the admin panel</h1>
      <p>Add a new blog post:</p>
      <form method="post" action="/admin">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title"><br><br>
        <label for="body">Body:</label><br>
        <textarea id="body" name="body"></textarea><br><br>
        <input type="submit" value="Submit">
      </form>
    `);
  } else {
    res.redirect('/login');
  }
});

app.post('/admin', (req, res) => {
  const { title, body } = req.body;
  // Here you can add code to save the new blog post to a database or file
  res.send('Blog post successfully added!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
