const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')
const User = require('../models/user')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

var cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    return token;
};

passport.use(new JWTStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : 'secret'
},
function(jwt_payload, done){
    console.log(jwt_payload)
    return User.getUserById(jwt_payload._id, function(err,user){
        done(err,user)
    })
}))


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (username, password, done) {
        User.getUserByEmail(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                console.log('UnKnwon user')
                return done(null, false)
            }

            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    console.log('HI')
                    return done(null, user)
                } else {
                    console.log('Invalid password')
                    return done(null, false)
                }
            });
        });
    }));