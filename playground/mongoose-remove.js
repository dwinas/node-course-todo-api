//const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{

    if(err){

       return console.log('Unable to conect to Mongo db server')

    } 
    console.log('Connected to MongoDB server')

    // deleteMany

    // db.collection('Todos').deleteMany({text: "Eat lunch"}).then((result) => {

    //     console.log(result)
    // })

    // delete one

    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {


    //     console.log(result)

    // })

    // findOneAndDelete

    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {

    //     console.log(result)
    // })

    // db.collection('Users').deleteMany({name: 'Edvinas'}).then((result) =>{

    //     console.log(result)
    // })

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5c06ab52899de53900bf0337')}).then((result) => {

        console.log(result)
    })



    //db.close()
})