const express = require('express');
const router = express.Router();

// Shows all public listings
router.get('/', (req, res) => {
  res.render('listings');
});

// Create a new listing when logged in
router.get('/create', (req, res) => {
  res.render('create');
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
