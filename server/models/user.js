const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')




const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
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
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
})
// perrasom metoda kad nesiusstu kodo info
UserSchema.methods.toJSON = function () {

    const user = this
    const userObject = user.toObject()
    return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function (){
    let user = this
    const access = 'auth'
    let token = jwt.sign({_id: user._id.toHexString },'abc123').toString()

    user.tokens = user.tokens.concat([{access, token}])

    return user.save().then(()=>{
        return token
    })
}




const User = mongoose.model('Users', UserSchema)
module.exports = {User}