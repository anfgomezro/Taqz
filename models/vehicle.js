const mongoose = require('mongoose')

var VehicleSchema = mongoose.Schema({
    class: String,
    brand: String,
    line: String,
    cilinder: Number
})

var Vehicle = module.exports = mongoose.model('Vehicle', VehicleSchema)