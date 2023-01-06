const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

const listingQueries = require('../db/queries/listings-queries')
const userQueries = require('../db/queries/users-queries')

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

// mark as sold
router.post('/sold/:listingId', (req, res) => {
  const userId = req.session.user_id;
  const listingId = req.params.listingId;

  listingQueries.markAsSoldQuery(listingId)
    .then(() => {
      res.redirect(`/users/${userId}/listings`);
    })
    .catch((err) => {
      console.log('err', err);
    })
});


module.exports = router;
