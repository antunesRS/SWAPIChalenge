const express = require('express')
const bodyParser = require('body-parser')
const PORT = 3000

var server = express()

server = require('./app/app')(server)

server.use(bodyParser.json())
server.use(express.urlencoded({ extended: false }))

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})