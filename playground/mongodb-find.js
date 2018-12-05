//const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{

    if(err){

       return console.log('Unable to conect to Mongo db server')

    } 
    console.log('Connected to MongoDB server')


    db.collection('Users').find({name: 'Edvinas'}).toArray().then((doc) => {

        console.log(doc)
    }, (err) => {
        console.log('Cant fech data ', err)
    })

    // db.collection('Todos').find({_id: new ObjectID('5c06b31dd381a499716180d5')}).toArray().then((docs) =>{

    //     console.log('Todos')
    //     console.log(JSON.stringify(docs, undefined, 2))

    // }, (err) => {

    //     console.log('Unable to fech data', err)
    // })

    //  db.collection('Todos').find().count().then((count) =>{

    //     console.log('Todos count: ', count)

    // }, (err) => {

    //     console.log('Unable to fech data', err)
    // })


    //db.close()
})