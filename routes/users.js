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

const userQueries = require('../db/queries/users-queries')
const listingQueries = require('../db/queries/listings-queries')

// Users Database (json)
// router.get('/', (req, res) => {
//   userQueries.getUsers()
//     .then((users) => {
//       res.json(users)
//     })
// });

// Individual User Page (json)
// router.get('/:userid', (req, res) => {
//   userQueries.getUserById(req.params.userid)
//     .then((user) => {
//       res.json(user)
//     })
// });

// User Listings
router.get('/:userid/listings', (req, res) => {
  let currentUser = req.session.user_id;
  let userId = Number(req.params.userid)
  const templateVars = { currentUser };
  if (currentUser === userId) {
    listingQueries.getListingsByUser(userId)
      .then((listings) => {
        templateVars.listings = listings
      })
      .then(() => {
        userQueries.getUserById(currentUser)
          .then((userDetails) => {
            templateVars.userDetails = userDetails
            res.render('listings', templateVars);
          })
      })
    return
  }
  console.log("You cannot access another user's listings!");
  res.status(400).send("Error 400: You cannot access another user's listings!");
});

module.exports = router;
