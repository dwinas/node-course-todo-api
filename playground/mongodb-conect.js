const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{

    if(err){

       return console.log('Unable to conect to Mongo db server')

    } 
    console.log('Connected to MongoDB server')

    // db.collection('Todos').insertOne({
    //     text: "Something to do",
    //     compleated: false

    // }, (err, result) => {
    //     if (err){
    //         return console.log('Unable to insert todo', err)
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })

    db.collection('Users').insertOne({

        name: 'Edvinas', 
        age: 30,
        location: 'Vilnius'

    }, (err, result) => {

        if(err){
            return console.log('Unable to insert into Users', err)
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
        console.log(result.ops[0]._id.getTimestamp())
    })

    db.close()
})