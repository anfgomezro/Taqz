const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
},
    function (username, password, done) {
        User.getUserByEmail(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                console.log('UnKnwon user')
                return done(null,false)
            }

            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    console.log('HI')
                    return done(null,user)
                } else {
                    console.log('Invalid password')
                    return done(null,false)
                }
            });
        });
    }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

router.post('/',
    passport.authenticate('local',{succesRedirect:'/api/hello',failureRedirect:'/register'}),
    function(req,res){
        req.session.save(() => {
            res.redirect('/api/hello')
        })
    }
)

router.get('/', (req,res,next) => {
    if (req.isAuthenticated()) {
        console.log('I am Autenticated1')
        return next()
    } else {
        console.log('I am not Autenticated sdfasf')
        res.redirect("/")
    }
}, function(req,res){
    console.log('I am Autenticated2')
})


module.exports = router;