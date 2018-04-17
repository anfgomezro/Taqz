const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/land', (req,res) =>{
    let id = req.body.id
    let errors = req.validationErrors()

    if (errors) {
        res.json({errors})
    } else {
        let lands = null
        User.getUserById(req.user._id, function (err, doc) {
            if (err) throw err
            doc.data.tax.land.pull(id)
            lands = doc.data.tax.land
            doc.save(err => {
                if(err) throw err
            })

            res.json({ status: true, lands })
        })

        
    }
})

router.post('/vehicle', (req, res) => {
    let id = req.body.id
    let errors = req.validationErrors()

    if (errors) {
        res.json({ errors })
    } else {
        let vehicles = null
        User.getUserById(req.user._id, function (err, doc) {
            if (err) throw err
            doc.data.tax.vehicle.pull(id)
            vehicles = doc.data.tax.vehicle
            doc.save(err => {
                if (err) throw err
            })
            res.json({ status: true, vehicles })
        })
        
    }
})

module.exports = router