const express = require('express')
const router = express.Router()
const Vehicle = require('../models/vehicle')
const User = require('../models/user')
const Tax = require('../models/taxes')
const Land = require('../models/land')
const Item = require('../models/item')

router.post('/car', (req,res) => {
    let brand = req.body.brand
    let kind = req.body.kind
    let line = req.body.line
    let engine = req.body.engine

    let errors = req.validationErrors()

    if(errors){
        res.send('Fatal')
    } else {

        let newVehicle = new Vehicle({
            class : kind,
            brand : brand,
            line : line,
            cilinder : engine
        })

        User.updateUser(req.user._id, function(err, doc){
            if (err) throw err
            doc.data.tax.vehicle.push(newVehicle)
            doc.save((err) => {
                if(err) throw err
            })
        })

        res.send('fine')
    }
})

getCost = (value) => {
    if (value < 104190000) {
        return  550000
    } else if (value < 111029000) {
        return  560000
    } else if (value < 127820000) {
        return  570000
    } else if (value < 144612000) {
        return  580000
    } else if (value < 161403000) {
        return  590000
    } else if (value < 178194000) {
        return  600000
    } else if (value < 194985999) {
        return  610000
    } else if (value < 211776000) {
        return  620000
    } else if (value < 239761000) {
        return  630000
    } else if (value < 267747000) {
        return  640000
    } else if (value < 295732000) {
        return  650000
    } else if (value < 323717000) {
        return  660000
    } else if (value < 351702000) {
        return  680000
    } else if (value < 379688000) {
        return  700000
    } else if (value < 407673000) {
        return  720000
    } else if (value < 435658000) {
        return  740000
    } else if (value < 463643000) {
        return  760000
    } else if (value < 502823000) {
        return  780000
    } else if (value < 542002000) {
        return  800000
    } else if (value < 581181000) {
        return  820000
    } else if (value < 620361000) {
        return  840000
    } else if (value < 659540000) {
        return  860000
    } else if (value < 698719000) {
        return  880000
    } else if (value < 737899000) {
        return  900000
    } else if (value < 777078000) {
        return  920000
    } else if (value < 917004000) {
        return  950000
    } else if (value < 1056931000) {
        return  990000
    } else if (value < 1196857000) {
        return  1030000
    } else if (value < 1343292000) {
        return  1080000
    } else {
        return 1130000
    }
}

router.post('/land', (req,res) => {
    let value = req.body.valuation
    let bill = req.body.bill
    let name = req.body.name
    let cost = 0

    let errors = req.validationErrors()

    if(errors){
        res.send('error land added')
    } else {

        let newLand = new Land({
            value : value,
            bill : (bill == 'on') ? true : false,
            name : name,
            cost : getCost(value)
        })

        User.updateUser(req.user._id, function(err, doc){
            if(err) throw err
            doc.data.tax.land.push(newLand)
            doc.save( err => {
                if(err) throw err
            })
        })

        res.send('added land')
    }
})

router.post('/income', (req,res) =>{
    let value = req.body.value
    let type = req.body.type
    let description = req.body.description

    let errors = req.validationErrors()

    if(errors){
        res.send('error income add')
    }else{
        let newItem = new Item({
            value : value,
            description : description,
            date : new Date()
        })

        User.updateUser(req.user._id, function(err,doc){
            if(err) throw err
            let arr = doc.data.income
            for(let i of arr){
                if(i.name == type){
                    i.items.push(newItem)
                    break
                }
            }
            doc.save( err =>{
                if (err) throw err
            })   
        })

        res.send('Added item')
    }
})

module.exports = router 