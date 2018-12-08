const mongoose = require('mongoose')

let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        require: true,
        minlength: 1,
        //ismeta tarpus vietas
        trim: true 
    },
    completed: {
        type: Boolean,
        default: false
    },
    compleatedAt: {
        type: Number,
        default: null
    }
})

module.exports = {Todo}