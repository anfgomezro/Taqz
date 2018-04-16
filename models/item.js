const mongoose = require('mongoose')

var ItemSchema = mongoose.Schema({
    value: Number,
    description : String, 
    date : Date
})

var Item = module.exports = mongoose.model('Item', ItemSchema)