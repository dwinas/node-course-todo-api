var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');


const todo = new Todo({
})

todo.save().then((data) => {

    console.log(data)
}, (err) => {

    console.log(err)
})