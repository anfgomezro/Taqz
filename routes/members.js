const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/' ,(req,res) => {
    User.count({},function (err, count){
        res.json({count})
    })
})

module.exports = router