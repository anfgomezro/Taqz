const express = require('express')
const router = express.Router()

router.get('/',(req,res) => {
    res.json({session : true})
})

module.exports = router