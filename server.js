const express = require('express');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
const login = require('./routes/login')
const bodyParser = require('body-parser')


mongoose.connect('mongodb://localhost/taqz', function (err){
  if(err){
    throw err
  } else {
    console.log('Connected to Mongo')
  }
})

var db = mongoose.connection

const app = express();

app.use(express.static('./client/src'))



app.get('/api/hello', (req, res) => {
  res.sendFile(__dirname + '/api/nav.json');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use('/login',login)

app.listen(port, () => console.log(`Listening on port ${port}`));
