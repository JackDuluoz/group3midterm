const express = require('express');
const router = express.Router();

// Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Registration Page
router.get('/register', (req, res) => {
  res.render('register');
});

// Form Submission to Login
router.post('/login', (req, res) => {
  res.render('index')
});

// Form Sumission to Register
router.post('/register', (req, res) => {
  res.render('index')
});

// Click Button to Logout
router.post('/logout', (req, res) => {
  res.render('index')
});

module.exports = router;
