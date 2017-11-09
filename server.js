const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use( (req, res, next) => {
  var now = new Date().toString();
  var log = `1 - ${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log+'\n', (err) => {
    if (err) {
      console.log(err);
    }
  });

  next();
});

// app.use( (req,res,next) => {
//   console.log('2');
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));



hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello express!</h1>');
  res.render('home.hbs', {
      pageTitle: 'Home page',
      message: 'Welcome to my domain'
  });

});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
      pageTitle: 'About page'
  });
});

app.get('/bad', (req, res) => {
    res.send({
      errorMessage: 'deu ruim'
    })
} );



app.listen(3000);
