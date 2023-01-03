const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require("bcryptjs");

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

// User Database

const userDatabase = require('../userDatabase')

// Helper Functions

const { shortURLGenerator, getUserByEmail } = require('../helpers')

// Login Page
router.get('/login', (req, res) => {
  let currentUser = req.session.user_id;
  const templateVars = { currentUser: userDatabase[currentUser] };
  if (currentUser !== undefined) {
    res.redirect('/');
  }
  res.render('login', templateVars);
});

// Registration Page
router.get('/register', (req, res) => {
  let currentUser = req.session.user_id;
  const templateVars = { currentUser: userDatabase[currentUser] };
  if (currentUser !== undefined) {
    res.redirect('/');
  }
  res.render('register', templateVars );
});

// Form Submission to Login
router.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  const user = getUserByEmail(email, userDatabase);
  if (user && (bcrypt.compareSync(password, userDatabase[user].password) === true)) {
    console.log("Credentials Match");
    req.session.user_id = userDatabase[user].id;
    res.redirect('/');
    return;
  }
  console.log("User Not Found");
  res.statusCode = 403;
  res.status(403).send("Error 403: User Not Found.");
});

// Form Sumission to Register
router.post('/register', (req, res) => {
  const id = shortURLGenerator();
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
  if (newEmail === "" || newPassword === "") {
    console.log("Username and/or Password Empty");
    res.statusCode = 400;
    res.status(404).send("Error 400: Username and/or Password Empty.");
    return;
  }
  for (let user in userDatabase) {
    if (newEmail === userDatabase[user].email) {
      console.log("User Already Registered");
      res.statusCode = 400;
      res.status(404).send("Error 400: User Already Registered.");
      return;
    }
  }
  userDatabase[id] = { id: id, email: newEmail, password: hashedNewPassword };
  req.session.user_id = id;
  console.log("USERS", userDatabase);
  let currentUser = req.session.user_id;
  console.log(currentUser)
  res.redirect('/');
});

// Click Button to Logout
router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
