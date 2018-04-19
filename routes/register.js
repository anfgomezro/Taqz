const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Tax = require('../models/taxes')
const Cat = require('../models/cat')

router.post('/',function (req,res){
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let email = req.body.email
    let password = req.body.password
    let password2 = req.body.password2

    req.checkBody('first_name','fnS').notEmpty()
    req.checkBody('email', 'emailS').notEmpty()
    req.checkBody('email', 'emailnS').isEmail()
    req.checkBody('last_name', 'lnS').notEmpty()
    req.checkBody('password' , 'pS').notEmpty()
    req.checkBody('password2' , 'pnmS').equals(password)

    let errors = req.validationErrors()

    if(errors){
        console.log(errors)
        res.json({errors, status : false})
    } else {

        let newTax = new Tax({
            vehicle: [],
            land : [],
            rent : 0
        })

        let  salary = new Cat({
            name : 'Salary',
            items : []
        }) 

        let food = new Cat({
            name: 'Food',
            items : []
        })

        let transport = new Cat({
            name : 'Transport',
            items : []
        })

        let entertainment = new Cat({
            name: 'Entertainment',
            items : []
        })

        let newUser = new User({
            first_name : first_name,
            last_name : last_name,
            email : email,
            password : password,
            data : {
                tax : newTax,
                income : [salary],
                expense: [food, transport, entertainment]
            }
        })

        User.createUser(newUser)
        res.json({status : true})
    }
})

module.exports = router;