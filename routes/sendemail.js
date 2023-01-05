const express = require('express');
const router = express.Router();
//const client = require('@sendgrid/mail');

// Set the API key
//client.setApiKey(process.env.SENDGRID_API_KEY);

//const app = express();

const {getBuyerEmail, getSellerEmail, getUserName} = require('../db/queries/users-queries.js');
const {getListingName} = require('../db/queries/listings-queries.js');

const sendEmailToClient = require('../sendgrid.js'); //is this the correct path?

// Set up the POST route
router.post('/:listingId', (req, res) => {

buyerId = req.session.user_id; //how will I access the buyer user id to be inputted into getBuyerEmail
listingId = req.params.listingId;
const buyerEmailPromise = getBuyerEmail(buyerId);
const sellerEmailPromise = getSellerEmail(listingId);
const userNamePromise= getUserName(buyerId);
const listingNamePromise = getListingName(listingId);

const listOfInfo = [buyerEmailPromise, sellerEmailPromise, userNamePromise, listingNamePromise];
Promise.all(listOfInfo)
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
