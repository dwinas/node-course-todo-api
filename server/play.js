
const jwt = require('jsonwebtoken')

const id = {
    _id: 123456
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDY3MTMzNzd9.-86G0aN6V8ZvuckfumUVP-YDgte3tG2oz2C-9DNEhow'



const decode = jwt.verify(token, 'abc123')

console.log('dekoduotas', decode)