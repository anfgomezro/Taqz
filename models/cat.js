const mongoose = require('mongoose')
const Item = require('./item')

var CatSchema = mongoose.Schema({
    name : String,
    items : [Item.schema]
})

var Cat = module.exports = mongoose.model('Cat', CatSchema)