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

// Individual Listing Pages
router.get('/:id', (req, res) => {
  listingQueries.getListingById(req.params.id)
    .then((listing) => {
      res.json(listing)
    })
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

router.post('/:listingId', (req, res) => {
  const userId = req.session.user_id;
  const listingId = req.params.listingId;
  listingQueries.deleteListingQuery(listingId)
    .then(() => {
      res.redirect(`/users/${userId}/listings`);
    })
    .catch((err) => {
      console.log('err', err);
    })
});

module.exports = router;
