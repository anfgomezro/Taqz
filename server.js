const express = require('express');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var cookieParser = require('cookie-parser');
const register = require('./routes/register')
const login = require('./routes/login')
const logout = require('./routes/logout')
var cookieSession = require('cookie-session')
const MongoStore = require('connect-mongo')(session)
const usr = require('./routes/usr')
const auth = require('./routes/auth')

require('./passport/passport')

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
  console.log('damit')
  res.sendFile(__dirname + '/api/nav.json');
});

app.get('/shit', (req, res) => {
  console.log('reshit')
  res.send('shit')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

//app.use(session({
  //secret: 'secret',
  //saveUninitialized: true,
  //resave: true,
  //store : new MongoStore({mongooseConnection : db})
//}))

//app.use(passport.initialize())
//app.use(passport.session())


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


app.use('/register', register)
app.use('/login', login)
app.use('/logout', logout)
app.use('/usr', passport.authenticate('jwt', { session: false }), usr)
app.use('/auth', passport.authenticate('jwt', { session: false }), auth)


app.listen(port, () => console.log(`Listening on port ${port}`));
