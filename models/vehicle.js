const mongoose = require('mongoose')

var VehicleSchema = mongoose.Schema({
    class: String,
    line: String,
    cost: Number
})

var Vehicle = module.exports = mongoose.model('Vehicle', VehicleSchema)