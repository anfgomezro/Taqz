const mongoose = require('mongoose')

var LandSchema = mongoose.Schema({
    stratum: {
        type: Number,
        min: 1,
        max: 6
    },
    value: Number
})

var Land = module.exports = mongoose.model('Land', LandSchema)