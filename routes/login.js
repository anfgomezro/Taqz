const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


router.post('/',
    passport.authenticate('local', { session: false }), 
    (req,res) => {
        const token = jwt.sign(req.user.toJSON(), 'secret');
        res.cookie('token',token,{expires: new Date(Date.now() + 7200000)})
        res.json({ user : req.user, token });
    }
);

module.exports = router;