const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

const userDatabase = require('../userDatabase')


router.get('/', (req, res) => {

});

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
