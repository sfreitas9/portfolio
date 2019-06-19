const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const profile = require('./profile');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log("API key", process.env.SENDGRID_API_KEY);

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

//define the route that will use my custom route
//app.use('/profile', profile);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/portfolio', (req, res) => {
  const data = [
    {
      goal: 'Express server, using APIs' ,
      url: 'https://sf-boredom-buster.herokuapp.com/',
      image: 'BoredomBuster.png',
      alt: 'Boredeom Buster Project'
    },
    {
      goal: 'Built with React' ,
      url: 'https://sf-vstda.herokuapp.com/',
      image: 'VSTDA.png',
      alt: 'Very Simple To Do App Project'
    },
    {
      goal: 'Simple React app with animations' ,
      url: 'https://sf-change-calculator.herokuapp.com/',
      image: 'ChangeCalculator.png',
      alt: 'Change Calculator Project'
    },
    {
      goal: 'React app' ,
      url: 'https://sf-mortgage-calculator.herokuapp.com/',
      image: 'MortgageCalculator.png',
      alt: 'Mortgage Calculator Project'
    }
  ];
  res.render('portfolio',{ projects : data });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/thanks', (req, res) => {
  // using Twilio SendGrid's v3 Node.js Library https://github.com/sendgrid/sendgrid-nodejs
  const msg = {
    to: 'sherry.freitas@gmail.com',
    from: req.body.email,
    subject: `Email from ${req.body.firstName} ${req.body.lastName}`,
    text: req.body.message,
  };
  sgMail.send(msg);
  res.render('thanks', { person : req.body });
});

app.listen(8080, console.log('server is listening at http://localhost:8080'));
