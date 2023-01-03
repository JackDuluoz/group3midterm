/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// Users Database?
router.get('/', (req, res) => {
  res.render('users');
});

// Account Profile
router.get('/:userid', (req, res) => {
  res.render('single-user');
});

// User Listings
router.get('/:userid/listingss', (req, res) => {
  res.render('listings');
});

// User Messages (incoporate Ajax like Tweeter -- single page)
router.get('/:userid/messages', (req, res) => {
  res.render('messages');
});

// User Transactions
router.get('/:userid/transactions', (req, res) => {
  res.render('transactions');
});

module.exports = router;
