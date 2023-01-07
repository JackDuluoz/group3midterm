/*
* Logic for integrating sendgrid API.
*/

const express = require('express');
const router = express.Router();


const {getBuyerEmail, getSellerEmail, getUserName} = require('../db/queries/users-queries.js');
const {getListingName} = require('../db/queries/listings-queries.js');

const sendEmailToClient = require('../sendgrid.js');

// POST route
router.post('/:listingId', (req, res) => {

buyerId = req.session.user_id;
listingId = req.params.listingId;

//Accessing the success result of the promises appended to the SQL queries.
//Not DRYed up for readability purposes.
const buyerEmailPromise = getBuyerEmail(buyerId);
const sellerEmailPromise = getSellerEmail(listingId);
const userNamePromise= getUserName(buyerId);
const listingNamePromise = getListingName(listingId);

const listOfInfo = [buyerEmailPromise, sellerEmailPromise, userNamePromise, listingNamePromise];
Promise.all(listOfInfo)
//Once all promises have resolved asynchronously, then take the promise results and pass them into the sendEmailToClient function
.then(
  listOfResults => {
    const buyerEmail = listOfResults[0];
    const sellerEmail = listOfResults[1];
    const userName = listOfResults[2];
    const listingName = listOfResults[3];
    return sendEmailToClient(buyerEmail, sellerEmail, userName, listingName);
  }
)
.then(
  () => {
    res.redirect('/');
  }
)
.catch(
  (err) => {
    console.log('err', err);
    res.redirect('/');
  }
)

});

module.exports = router;
