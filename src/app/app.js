const express = require('express')
const repository = require('../repository/repository')
const service = require('../service/service')

module.exports = (server) => {
    const router = express.Router()

    router.post('/add', addPlanet)
    router.get('/all', getList)
    router.get('/getById', getById)
    router.delete('/delete', deletePlanet)
    router.get('/getByName', getByName)

    server.use('/', router)

    return server
}

function addPlanet(req, res){
    service.findByName(req.query.nome)
        .then(response => {
            if(response.data['results'].length != 0){

                var planet = {
                    name: req.query.nome,
                    climate: req.query.clima,
                    terrain: req.query.terreno,
                    numberOfFilms: response.data['results'][0].films.length
                }
                
                repository.save(planet)

                res.status(200).send({message: "Planeta adicionado com sucesso!"})
            }
            else
                res.status(404).send({message: "Com esse nome não existe planeta, jovem padawan..."})
        })
        .catch(error => {
            console.log(error)
            res.status(500).send({message: "Ops... ocorreu um erro enquanto adicionávamos seu planeta... malz =("})
        })
}

function getList(req, res){
    repository.getList(res)
}

function getById(req, res){
    repository.findById(req.query.planetSearchId, res)
}

function getByName(req, res){
    repository.findByName(req.query.nome, res)
}

function deletePlanet(req, res){
   repository.delete(req.query.nome, res)
}