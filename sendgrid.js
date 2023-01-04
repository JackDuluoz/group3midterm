const client = require('@sendgrid/mail');

client.setApiKey(process.env.SENDGRID_API_KEY);
console.log('api key', process.env.SENDGRID_API_KEY);
const message = {
  personalizations: [
    {
      to: [
        {
          email: 'kirstenhammondrvn@gmail.com',
          name: 'John Doe'
        }
      ]
    },
    {
      from: {
        email: 'kirstenhammondrvn@gmail.com',
        name: 'Example Sales Team'
      },
      to: [
        {
          email: 'kirstenhammondrvn@gmail.com',
          name: 'Janice Doe'
        }
      ]
    }
  ],
  from: {
    email: 'kirstenhammondrvn@gmail.com',
    name: 'kirsten rvn'
  },
  replyTo: {
    email: 'kirstenhammondrvn@gmail.com',
    name: 'kirsten returned'
  },
  subject: 'Your Example Order Confirmation',
  content: [
    {
      type: 'text/html',
      value: '<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>'
    }
  ]
};

client
  .send(message)
  .then(() => console.log('Mail sent successfully'))
  .catch(error => {
    console.error('error', error);
  });
