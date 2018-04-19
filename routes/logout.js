const express = require('express')
const router = express.Router()

router.post('/',function (req,res){
    res.clearCookie('token')
    //res.json({ session: false })
    res.redirect(200,'/login')
})

module.exports = router;