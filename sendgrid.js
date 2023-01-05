require('dotenv').config();
const client = require('@sendgrid/mail');

client.setApiKey(process.env.SENDGRID_API_KEY);
//const apiKey = `${process.env.SENDGRID_API_KEY}`;
//console.log('api key', apiKey);



const sendEmailToClient = (buyerEmail, sellerEmail, userName, listingName ) => {
 const msg = {
    to: sellerEmail,
    from: 'kirstenhammondrvn@gmail.com', // The sendgrid verified sender (stays as hardcode for now)
    replyTo: buyerEmail,
    subject: listingName,
    text:   `${userName} has sent you an email and is interested in buying your ${listingName}. Please reply to this email to respond to them directly.`,
  }
console.log("potato");

  return client
  .send(msg)
  .then(() => console.log('Mail sent successfully'))
  .catch(error => {
    console.error('error', JSON.stringify(error, null, 4));
    //console.log(error.body);
  })
};

module.exports = sendEmailToClient;


