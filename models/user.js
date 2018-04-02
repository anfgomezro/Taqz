const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

var UserSchema = mongoose.Schema({
    first_name  : String,
    last_name   : String,
    email       : {
                type: String,
                unique : true
    },
    password    : String
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