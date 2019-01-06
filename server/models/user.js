const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')




const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate:{

            validator: (value) =>{
                return validator.isEmail(value)
            },
            message: '{VALUE} is not a valid email'
        }
    },
    pasword: {
        type: String, 
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})
// perrasom metoda kad nesiusstu kodo info
UserSchema.methods.toJSON = function () {

    const user = this
    const userObject = user.toObject()
    return _.pick(userObject, ['_id', 'email'])
}

// Generuojam tokena
UserSchema.methods.generateAuthToken = function (){
    let user = this
    let access = 'auth'
    let token = jwt.sign({_id: user._id.toHexString(), access },'abc123').toString()
    user.tokens = user.tokens.concat([{access, token}])

    return user.save().then(()=>{
        return token
    })
}

UserSchema.statics.findByToken = function (token) {

    let User = this
    let decoded
    try{
        decoded = jwt.verify(token,'abc123')
    }catch (e){
        return Promise.reject()
        // new Promise((resolve, reject) =>{
        //     reject()
        // })
    }
    console.log('dekoduotas', decoded)
    return User.findOne({
        _id: decoded._id,
        'tokens.token':token,
        'tokens.access': 'auth'
    })
}

UserSchema.pre('save', function(next){

    var user = this
    if(user.isModified('pasword')){

        bcrypt.genSalt(10, (err, salt) =>{
            bcrypt.hash(user.pasword, salt, (err, hash) =>{
                user.pasword = hash
                next()
            })
        })

    }else{
        next()
    }
})




const User = mongoose.model('Users', UserSchema)
module.exports = {User}