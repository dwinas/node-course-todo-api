//const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{

    if(err){

       return console.log('Unable to conect to Mongo db server')

    } 
    console.log('Connected to MongoDB server')



db.collection('Users').findOneAndUpdate({_id: new ObjectID('5c06afe15cb55843e4b60500')}, {
    $set: {
        name: 'Mike updated'
    },
    $inc:{
        age: 10
    }
    }, {
        returnOriginal: false

    }).then((result) => {

    console.log(result)
})


//   db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5c081cfdd381a499716185b5')}, {
//     $set: {
//         completed: true
//     }
// }, {
//         returnOriginal: false
//     }).then((result) => {
//         console.log(result)
//     })

 

    //db.close()
})