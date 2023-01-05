const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

const userDatabase = require('../userDatabase')


// Create a new listing when logged in
router.get('/', (req, res) => {
  console.log("test")
  let currentUser = req.session.user_id;
  const templateVars = { currentUser: userDatabase[currentUser] };
  if (currentUser !== undefined) {
    res.render("create", templateVars);
  }
  res.redirect('/session/login');
});

module.exports = router;
