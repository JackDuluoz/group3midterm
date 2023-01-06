const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

const userDatabase = require('../userDatabase')
const listingQueries = require('../db/queries/listings-queries')


// Create a new listing when logged in
router.get('/', (req, res) => {
  let currentUser = req.session.user_id;
  const templateVars = { currentUser };
  if (currentUser !== undefined) {
    res.render("create", templateVars);
  }
  res.redirect('/session/login');
});

router.post('/', (req, res) => {
  console.log("test")
  const userId = req.session.user_id
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const size = req.body.size;
  const gender = req.body.gender;
  const condition = req.body.condition;
  listingQueries.addListing(userId, name, description, price, size, gender, condition)
  
  // let currentUser = req.session.user_id;
  // const templateVars = { currentUser: userDatabase[currentUser] };
  // if (currentUser !== undefined) {
  //   res.render("create", templateVars);
  // }
  res.redirect('/');
});

module.exports = router;
