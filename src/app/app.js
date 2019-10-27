const express = require('express')
const repository = require('../repository/repository')

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
    repository.save(req.query)
}

function getList(req, res){
    repository.getList(res)
}

function getById(req, res){
    repository.findById(req.query.id, res)
}

function getByName(req, res){
    repository.findByName(req.query.nome, res)
}

function deletePlanet(req, res){
   repository.delete(req.query.nome, res)
}