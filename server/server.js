var express = require('express');
var bodyParser = require('body-parser');

let {ObjectID} = require('mongodb')

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

const port = process.env.PORT || 3000

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {

    Todo.find().then((todos) => {

        res.send({todos})
    }, (err) => {

        res.status(400).send(e)
    })
})

app.listen(port, () => {
  console.log('Started on port', port);
});

module.exports = {app};

app.get('/todos/:id', (req, res) => {

  console.log('Gautas request')
  let id = req.params.id

  if(!ObjectID.isValid(id)) {
   return res.status(400).send('wrong id code')
  }
  Todo.findById(id).then((todo) => {

    if(!todo) {
      return res.status(404).send('Tokio objekto nera')
    }
    res.send({todo})
  }).catch((e) => {
    res.status(400).send(e)
    
  })

})

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.status(400).send('Wrong id code')
  }

  Todo.findByIdAndRemove(id).then((doc) => {

    if (!doc) {
      return res.status(404).send('Object not found')
    }

    res.send(doc)
  }).catch((e) => {
    res.status(400).send(e)
  })
})



