

const {ObjectID} = require('mongodb')
const {mongoose} =require('./../server/db/mongoose')
const {Todo} =require('./../server/models/todo')

//grazina visus
// const id = '6c0bf81288a6662220fe1599'

// if(!ObjectID.isValid(id)){
//     console.log('ID not valide'
// )
// }


// Todo.find({_id: id}).then((todos) => {

//     console.log('Todos visi duomenu bazeje:', todos)
// })

// //grazina pirma kuris atitinka kriterijus

// Todo.findOne({_id: id}).then((todo) => {

//     console.log('Todo vienas pagal id', todo)
// })

// Todo.findById(id).then((todo) => {

//     if (!todo) {
//         return console.log('Id not found')
//     }
//     console.log('Todo find by id:', todo)
// }).catch((e) => console.log(e))

const id = '5c095964aa0b4523649d96be'
const {User} = require('./../server/models/user')

if(!ObjectID.isValid(id)){
    console.log('Netinkamas id formatas')
}

User.findById(id).then((data) => {

    if (!data) {
        return console.log('Toks id nerastas')
    }
    console.log('Rastas: ', data)
}).catch((e) => {
    console.log('Klaida: ', e)
})