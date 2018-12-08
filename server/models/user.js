const mongoose = require('mongoose')

const user = mongoose.model('Users', {

    email: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    },

    pasword: {
        type: String, 
        default: '0000'
    }
})


module.exports = {user}