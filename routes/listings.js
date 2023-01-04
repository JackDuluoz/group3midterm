const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

const userDatabase = require('../userDatabase')
const listingQueries = require('../db/queries/listings-queries')

// Listings Database
router.get('/', (req, res) => {
  listingQueries.getListings()
    .then((listings) => {
      res.json(listings)
    })
 });

// router.get('/', (req, res) => {
//   let currentUser = req.session.user_id;
//   const templateVars = { currentUser: userDatabase[currentUser] };
//   if (currentUser !== undefined) {
//     console.log('----------------------------')
//     console.log('CURRENT USER:', currentUser)
//     console.log('----------------------------')
//     // res.send(getListings)
//     res.render('listings', templateVars);
//   }
//   res.redirect('/session/login');
// });

// Create a new listing when logged in
router.get('/create', (req, res) => {
  let currentUser = req.session.user_id;
  const templateVars = { currentUser: userDatabase[currentUser] };
  if (currentUser !== undefined) {
    res.render("create", templateVars);
  }
  res.redirect('/session/login');
});

// Create a new listing when logged in
router.post('/', (req, res) => {

});

// Individual listing by id
router.get('/:id', (req, res) => {

});

// Edit listing
router.put('/:id', (req, res) => {

});

// Delete listing
router.delete('/:id', (req, res) => {

});

module.exports = router;
