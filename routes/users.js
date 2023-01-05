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
const userQueries = require('../db/queries/users-queries')
const listingQueries = require('../db/queries/listings-queries')

// Users Database
router.get('/', (req, res) => {
  userQueries.getUsers()
    .then((users) => {
      res.json(users)
    })
});

// Account Profile for Individual User
router.get('/:userid', (req, res) => {
  userQueries.getUserById(req.params.userid)
    .then((user) => {
      res.json(user)
    })
});

// User Listings
router.get('/:userid/listings', (req, res) => {
  let currentUser = req.session.user_id;
  let userid = req.params.userid
  // console.log("USER ID:", userid)
  const templateVars = { currentUser: userDatabase[currentUser] };
  if (currentUser !== undefined) {

    listingQueries.getListingsByUser(userid)
      .then((listings) => {
        templateVars.listings = listings
        console.log(listings)
        res.render('listings', templateVars);
      })
  }
  // res.redirect('/session/login');
});

// User Messages (incoporate Ajax like Tweeter -- single page)
router.get('/:userid/messages', (req, res) => {
  let currentUser = req.session.user_id;
  const templateVars = { currentUser: userDatabase[currentUser] };
  if (currentUser !== undefined) {
    res.render('messages', templateVars);
  }
  res.redirect('/session/login');
});

module.exports = router;
