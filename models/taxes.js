const mongoose = require('mongoose')
const Vehicle = require('./vehicle')
const Land = require('./land')

var TaxSchema = mongoose.Schema({
    vehicle : [Vehicle.schema],
    land : [Land.schema],
    rent : Number
})

var Tax = module.exports = mongoose.model('Tax', TaxSchema)

