const express = require('express')

module.exports = (server) => {
    const router = express.Router()

    router.get('/add', addPlanet)
    router.get('/all', getList)
    router.get('/getById', getById)
    router.get('/delete', deletePlanet)
    router.get('/getByName', getByName)

    server.use('/', router)

    return server
}

function addPlanet(req, res){
    res.send("add funciona!")
}

function getList(req, res){
    res.send("list funciona!")
}

function getById(req, res){
    res.send("getById funciona!")
}

function getByName(req, res){
    res.send("getByName funciona!")
}

function deletePlanet(req, res){
    res.send("delete funciona!")
}