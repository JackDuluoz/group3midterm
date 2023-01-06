// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const userRoutes = require('./routes/users.js');
const listingRoutes = require('./routes/listings.js');
const createRoutes = require('./routes/create.js');
const sessionRoutes = require('./routes/session.js');
const sendEmailRoutes = require('./routes/sendemail.js');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', userRoutes);
app.use('/listings', listingRoutes);
app.use('/create', createRoutes);
app.use('/session', sessionRoutes);
app.use('/send-email', sendEmailRoutes);

const listingQueries = require('./db/queries/listings-queries');
const userQueries = require('./db/queries/users-queries');

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  let currentUser = req.session.user_id;
  const templateVars = { currentUser };
  listingQueries.getListings()
    .then((listings) => {
      templateVars.listings = listings;
    })
    .then(() => {
      userQueries.getUserById(currentUser)
        .then((userDetails) => {
          templateVars.userDetails = userDetails;
          res.render('index', templateVars);
        });
    });
});

app.post('/', (req, res) => {
  let currentUser = req.session.user_id;
  let minPrice = req.body.minPrice;
  let maxPrice = req.body.maxPrice;
  let favorites = req.body.favorites;
  let options = { minPrice, maxPrice, favorites, currentUser };
  const templateVars = { currentUser };
  listingQueries.getListings(options)
    .then((listings) => {
      templateVars.listings = listings;
    })
    .then(() => {
      userQueries.getUserById(currentUser)
        .then((userDetails) => {
          templateVars.userDetails = userDetails
          res.render('index', templateVars);
        })
    })
});

app.post('/favorite', (req, res) => {
  let currentUser = req.session.user_id;
  let listingid = req.body.listingid;
  // console.log('listingid', listingid);

  // listingQueries.addToFavorites(currentUser, listingid)
  //   .then((favorite) => {
  //     res.send(favorite);
  //   })
  //   .catch(error => {
  //     console.log("Something went wrong in server.js!");
  //   });

  listingQueries.checkIfFavorited(currentUser, listingid)
    .then((res) => {
      // console.log('res.rows', res.rows);

      if (!res.rows.length) {
        console.log('Added to favorites!');
        listingQueries.addToFavorites(currentUser, listingid);
        // document.getElementById(`${listingid}`).innerHTML = 'done!';
      } else {
        console.log('Already favorited!');
        listingQueries.deleteFromFavorites(currentUser, listingid)
      }
    });

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
