const express = require('express');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const cookieParser = require('cookie-parser')

const register = require('./routes/register')
const login = require('./routes/login')


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

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

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

app.use(function(req,res,next){
  res.locals.user = req.user || null
  next()
})

app.use('/register', register)
app.use('/login', login)

app.listen(port, () => console.log(`Listening on port ${port}`));
