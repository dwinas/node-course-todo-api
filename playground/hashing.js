
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const password = '123abc!'
bcrypt.genSalt(10, (err, salt) =>{
    bcrypt.hash(password, salt, (err, hash) =>{
        console.log(hash)
    } )
})
const hashedPasword = '$2a$10$C8a.MuNNP5MiNxyE4FYqnOSMe12u.qGILmbxs46XAU/SeEGnfaEue'
bcrypt.compare(password, hashedPasword, (err, res)=>{
    console.log(res)
})



// const data = {
//     id: 10
// }
// const token = jwt.sign(data, '1234abc' )
// const decoded = jwt.verify(token, '123abc')



// let mesage = 'I am user number 3'

// const hash = SHA256(mesage)

// console.log(hash)

// const data = {
//     id:4
// }

// let token = {
//     data,
//     hash: SHA252(JSON.stringify(data) + 'somesecret').toString()
// }

// const resultHash = SHA252(JSON.stringify(token.data) + 'somesecret').toString()
