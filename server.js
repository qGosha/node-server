const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials')
const app = express();
app.set('view engine', 'hbs');
// app.use( (req, res, next) => {
//   res.render('maintenance.hbs', {})
// })

app.use(express.static(__dirname + '/public'));

app.use( (req,res,next) => {
  const date = new Date().toString();
  const log = `${date}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', err => {
    if(err)console.log('Unable to connect')  })
  next()
});


hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())


app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Abot Page',
    currentYear: new Date().getFullYear(),
    welcomeMsg: 'Hello Yobana'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'Abot Page',
    currentYear: new Date().getFullYear()
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad Request'
  })
})

app.listen(3000, () => console.log('Server has been started'));
