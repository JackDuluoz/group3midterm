const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

const listingQueries = require('../db/queries/listings-queries')

// Access page to create new listing when logged in
router.get('/', (req, res) => {
  let currentUser = req.session.user_id;
  const templateVars = { currentUser };
  if (currentUser !== undefined) {
    res.render("create", templateVars);
  }
  res.redirect('/session/login');
});

// Submit form to add listing to database
router.post('/', (req, res) => {
  const userId = req.session.user_id
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const size = req.body.size;
  const gender = req.body.gender;
  const condition = req.body.condition;
  listingQueries.addListing(userId, name, description, price, size, gender, condition)
  res.redirect('/');
});

module.exports = router;
