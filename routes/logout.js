const express = require('express')
const router = express.Router()

router.get('/',function (req,res){
    res.clearCookie('token')
    res.json({ session: false })
})

module.exports = router;