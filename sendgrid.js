require('dotenv').config();
const client = require('@sendgrid/mail');

client.setApiKey(process.env.SENDGRID_API_KEY);
//const apiKey = `${process.env.SENDGRID_API_KEY}`;
//console.log('api key', apiKey);

const msg = {
  to: 'kirsty.hammond@hotmail.co.uk', // Change to your recipient
  from: 'kirstenhammondrvn@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

const sendEmailToClient = () => {
client
  .send(msg)
  .then(() => console.log('Mail sent successfully'))
  .catch(error => {
    console.error('error', JSON.stringify(error, null, 4));
    //console.log(error.body);
  })
};

sendEmailToClient();
