const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const profile = require('./profile');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.set('views', './views');
app.set('view engine', 'ejs');

//define the route that will use my custom route
//app.use('/profile', profile);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/thanks', (req, res) => {
  res.render('thanks', { person : req.body });
});

app.listen(8080, console.log('server is listening at http://localhost:8080'));
