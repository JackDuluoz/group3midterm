require('dotenv').config();
const client = require('@sendgrid/mail');

client.setApiKey(process.env.SENDGRID_API_KEY);
//const apiKey = `${process.env.SENDGRID_API_KEY}`;
//console.log('api key', apiKey);


const sendEmailToClient = (sellerEmail, buyerEmail, listingName, userName ) => {//do I need parameters in here?
  const msg = {
    to: sellerEmail, // req.body here?
    from: 'kirstenhammondrvn@gmail.com', // The sendgrid verified sender (stays as hardcode for now)
    replyTo: buyerEmail,
    subject: listingName,
    text:   `${userName} has sent you an email and is interested in buying your ${listingName}. Please reply to this email to respond to them directly.`,
  }

  client
  .send(msg)
  .then(() => console.log('Mail sent successfully'))
  .catch(error => {
    console.error('error', JSON.stringify(error, null, 4));
    //console.log(error.body);
  })
};

module.exports = sendEmailToClient;

//sendEmailToClient(); //do I call the function here?

