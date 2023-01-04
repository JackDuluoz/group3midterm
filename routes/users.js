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

// Users Database?
router.get('/', (req, res) => {
  res.render('users');
});

// Account Profile
router.get('/:userid', (req, res) => {

});

// User Listings
router.get('/:userid/listings', (req, res) => {
  res.render('listings');
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

// app.get("/u/:id", (req, res) => {
//   const shortURL = req.params.id;
//   for (let url in urlDatabase) {
//     if (url === shortURL) {
//       console.log("URL Found, Proceeding to Site");
//       res.redirect(urlDatabase[shortURL].longURL);
//       return;
//     }
//   }
//   console.log("URL Not in Database");
//   res.statusCode = 400;
//   res.status(400).send("Error 400: URL Not in Database.");
// });

// User Transactions
router.get('/:userid/transactions', (req, res) => {

});

module.exports = router;
