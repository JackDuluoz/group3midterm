/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

const userDatabase = require('../userDatabase')

// Users Database
router.get('/', (req, res) => {
  res.render('users');
});

// Account Profile
router.get('/:userid', (req, res) => {

});

// User Listings
router.get('/:userid/listings', (req, res) => {
  let currentUser = req.session.user_id;
  const templateVars = { currentUser: userDatabase[currentUser] };
  if (currentUser !== undefined) {
    console.log('----------------------------')
    console.log('CURRENT USER:', currentUser)
    console.log('----------------------------')
    res.render('listings', templateVars);
  }
  res.redirect('/session/login');
});

// User Messages (incoporate Ajax like Tweeter -- single page)
router.get('/:userid/messages', (req, res) => {
  let currentUser = req.session.user_id;
  const templateVars = { currentUser: userDatabase[currentUser] };
  if (currentUser !== undefined) {
    console.log('----------------------------')
    console.log('CURRENT USER:', currentUser)
    console.log('----------------------------')
    res.render('messages', templateVars);
  }
  res.redirect('/session/login');
});

module.exports = router;
