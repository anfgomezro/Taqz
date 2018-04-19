const express = require('express')
const router = express.Router()

router.get('/', (req,res) =>{
    res.json({status : 401})
})

module.exports = router