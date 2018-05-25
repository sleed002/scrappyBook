const express = require('express');
const app = express();
const port = process.env.PORT || 4200;
const bodyParser = require('body-parser');
// const DoggieRouter = require('./routes/dogs');
// const TricksRouter = require('./routes/tricks');
const path = require('path');
// ...

// make everything in ./client/build public
app.use(express.static(path.resolve(__dirname, './client/build')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.json({message: 'You are on the home page'});
});










app.get('*', (req, res) => {
  if (isXhr(req)) { // if ajax request
    // no route found
    res.status(404).json({error: 'not found'});
  } else { // else, browser request
    // let react handle routing client side
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  }
});



app.listen(port, () => {
  console.log(`listening on *:${port}`);
});

// https://stackoverflow.com/a/28540611
const isXhr = req => req.xhr || req.headers.accept.indexOf('json') > -1;
// this works for checking Axios requests but not every AJAX library
