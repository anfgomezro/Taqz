const mongoose = require('mongoose')

var LandSchema = mongoose.Schema({
    value: Number,
    bill : Boolean,
    name : String
})

var Land = module.exports = mongoose.model('Land', LandSchema)