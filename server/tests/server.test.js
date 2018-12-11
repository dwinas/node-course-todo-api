const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb')

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    comleted: true,
    compleatedAt: 444

}]


beforeEach((done) => {
  Todo.remove({}).then(() => {
   return Todo.insertMany(todos)
}).then(() => done())
})

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {

    it ('should get all todos', (done) => {

        request(app)

            .get('/todos')
            .expect(200)
            .expect((res) => {

                expect(res.body.todos.length).toBe(2)
            })

            .end(done)
    })
})


describe('GET/todos/:id', () => {

  it('should return todo doc', (done) =>{

    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text)
      })

      .end(done)
  })

  it('Should return 404 if todo not found', (done) => {

    const idToTry = new ObjectID()

      request(app)
        .get(`/todos/${idToTry.toHexString()}`)
        .expect(404)
        .end(done)

  })

  it('Shoud return 400 if id is not valid', (done) =>{

    request(app)
      .get('/todos/123abc')
      .expect(400)
      .end(done)
  })


})


// describe('DELETE/todos/:id', () => {

//   it('should remove a todo', (done) => {

//     const hexID = todos[0]._id.toHexString()
    

//       request(app)
//       .delete(`/todo/${hexID}`)
//       .expect(200)
//       .expect((res)=> {
//         expect(res.body.todo._id).toBe(hexID)
        
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err)
//         }

//         Todo.findById(hexID).then((todo)=>{

//           expect(todo).toNotExist()
//           done()
//         }).catch((e) => done(e))
//       })

//   })

  // it('Should return 404 if todo not found', (done) => {
  //     request(app)

  // })


//})

describe('PATCH /todos/:id',() =>{

    it('Should update the todo', (done) => {

      const hexId = todos[0]._id.toHexString()
      const text = 'This should be the new text'

      request(app)
        .patch(`/todos/${hexId}`)
        .send({
          completed: true,
          text: text
      })
        .expect(200)
        .expect((res)=>{

          expect((res) => {

            expect(res.body.todo.text).toBe(text)
            expect(res.body.todo.completed).toBe(true)
            expect(res.body.todo.compleatedAt).toBeA('number')
          
          })
        })
        .end(done)

    })

    it ('should clear compleatedAt when todo is not compleated', (done) =>{

      const hexId = todos[1]._id.toHexString()
      const text = 'This should testas pasikeite'
      request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
          expect(res.body.todo.text).toBe(text)
          expect(res.body.todo.completed).toBe(false)
          expect(res.body.todo.compleatedAt).toBe(null)
       
      })
      .end(done)

  })

})