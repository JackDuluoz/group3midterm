const express = require('express');
const client = require('@sendgrid/mail');

// Set the API key
client.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

// Set up the POST route
app.post('/send-email', (req, res) => {
  // Get the email details from the request body?
  const { to, from, replyTo, subject, text} = req.session.;


  // Send the email here or in sendgrid.js?
  client.send(msg).then(() => {
    console.log('Email sent');
    res.send('Email sent');
  }).catch((error) => {
    console.error(error);
    res.status(500).send(error);
  });
});
