

const _ = require('lodash')
const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb')

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

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


module.exports = {app};

app.get('/todos/:id', (req, res) => {

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
    return res.status(404).send('Wrong id code')
  }

  Todo.findByIdAndRemove(id).then((todo) => {

    if (!todo) {
      return res.status(404).send('Object not found')
    }

    res.send({todo})
  }).catch((e) => {
    res.status(400).send()
  })
})

app.patch('/todos/:id', (req, res) => {

  const id = req.params.id

  let body = _.pick(req.body,['text', 'completed'])

  if(!ObjectID.isValid(id)){
    return res.status(404).send
  }
  if(_.isBoolean(body.completed) && body.completed){

    body.compleatedAt = new Date().getTime()
  } else{
    body.completed = false
    body.compleatedAt = null
    console.log('Cia buvom', body.compleatedAt)

  }
  Todo.findOneAndUpdate(id, {

    $set:{
      completed: body.completed,
      compleatedAt: body.compleatedAt,
      text: body.text

    }
  }, {new: true}).then((todo) =>{

    if (!todo) {
      return res.status(404).send()
    }
    res.send({todo})

  }).catch((e) => {res.status(400).send()})
  
})


app.listen(port, () => {
  console.log('Started on port', port);
});



