const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

const listingQueries = require('../db/queries/listings-queries')

// Listings Database (json)
router.get('/', (req, res) => {
  listingQueries.getListings()
    .then((listings) => {
      res.json(listings)
    })
});

// Individual Listing Page (json)
router.get('/:id', (req, res) => {
  listingQueries.getListingById(req.params.id)
    .then((listing) => {
      res.json(listing)
    })
});

// Delete listing
router.delete('/:id', (req, res) => {

});

module.exports = router;
