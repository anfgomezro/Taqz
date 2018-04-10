const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Tax = require('./taxes')

var UserSchema = mongoose.Schema({
    first_name  : String,
    last_name   : String,
    email       : {
                type: String,
                unique : true
    },
    password    : String,
    data : {
        tax : Tax.schema
    }
})

var User = module.exports = mongoose.model('User', UserSchema)

module.exports.createUser = function(newUser){
    bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(function (err) {
                if (err) return handleError(err);
            })    
	    });
    });
}

module.exports.getUserByEmail = function(email,callback){
    let query = {email : email}
    User.findOne(query,callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.updateUser = function(id, callback){
    User.findById(id, callback)
}
