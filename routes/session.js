const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require("bcryptjs");

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

const userQueries = require('../db/queries/users-queries')

// Login Page
router.get('/login', (req, res) => {
  let currentUser = req.session.user_id;
  const templateVars = { currentUser };
  if (currentUser !== undefined) {
    res.redirect('/');
  }
  res.render('login', templateVars);
});

// Registration Page
router.get('/register', (req, res) => {
  let currentUser = req.session.user_id;
  const templateVars = { currentUser };
  if (currentUser !== undefined) {
    res.redirect('/');
  }
  res.render('register', templateVars );
});

// Form Submission to Login
router.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (email === "" || password === "") {
    console.log("Username and/or Password Empty");
    res.status(404).send("Error 400: Username and/or Password Empty.");
    return;
  }
  userQueries.checkUserByEmail(email)
    .then((user) => {
      console.log(user)
      if (user && (bcrypt.compareSync(password, user.password) === true)) {
        console.log("Credentials Match");
        req.session.user_id = user.id;
        res.redirect('/');
        return;
      }
      console.log("User Not Found");
      res.statusCode = 403;
      res.status(403).send("Error 403: User Not Found.");
    })
});

// Form Submission to Register
router.post('/register', (req, res) => {
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
  if (newEmail === "" || newPassword === "") {
    console.log("Username and/or Password Empty");
    res.status(404).send("Error 400: Username and/or Password Empty.");
    return;
  }
  userQueries.checkUserByEmail(newEmail)
    .then((user) => {
      if (user) {
        console.log("User Already Registered");
        res.status(404).send("Error 400: User Already Registered.");
        return
      }
      console.log("Proceed with Registration");
      userQueries.addUser(newEmail, hashedNewPassword)
      userQueries.getUserIdByEmail(newEmail)
        .then((userId) => {
          req.session.user_id = userId.id
          let currentUser = req.session.user_id;
          console.log(currentUser)
          res.redirect('/');
        })
    });
});

// Click Button to Logout and Empty Cookie Session
router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
