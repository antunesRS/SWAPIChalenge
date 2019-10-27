const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb://localhost:27017/planetsdb'

module.exports = {
    save : (data) => {
        MongoClient.connect(uri, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, 
            (err, client) => {
            if(err){
                console.log(err)
                throw err
            }
            const db = client.db('planetsdb')
            db.collection('planets').insertOne(data, (err, result) => {
                if(err){
                    console.log(err)
                    throw err
                }
                console.log('data successfully saved!')
            })
          })
    },

    getList : (res) => {
        MongoClient.connect(uri, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, 
            (err, client) => {
            if(err){
                console.log(err)
                throw err
            }
            const db = client.db('planetsdb')
            db.collection('planets').find({},{_id:0}).toArray((err, result) => {
                if(err){
                    console.log(err)
                    throw err
                }

                res.status(200).send({planets: result})
            })
          })
    },

    findByName: (name, res) =>{
        MongoClient.connect(uri, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, 
            (err, client) => {
            if(err){
                console.log(err)
                throw err
            }
            const db = client.db('planetsdb')
            db.collection('planets').find({"name": name}).toArray((err, result) => {
                if(err){
                    console.log(err)
                    throw err
                }

                if(result.length != 0)
                    res.status(200).send({planet: result})
                else
                    res.status(404).send({message: "Planeta esse que você pesquisa existir não pode..."})
                
            })
          })
    },

    findById: (id, res) => {
        MongoClient.connect(uri, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, 
            (err, client) => {
            if(err){
                console.log(err)
                throw err
            }
            const db = client.db('planetsdb')
            db.collection('planets').find({_id: id},(err, result) => {
                if(err){
                    console.log(err)
                    throw err
                }

                if(result)
                    res.status(200).send({planet: result})
                else
                    res.status(404).send({message: "Planeta esse que você pesquisa existir não pode..."})
                
            })
          })
    },

    delete: (name, res) => {
        MongoClient.connect(uri, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, 
            (err, client) => {
            if(err){
                console.log(err)
                throw err
            }
            const db = client.db('planetsdb')

            db.collection('planets').find({"name": name}).toArray((err, result) => {
                if(err){
                    console.log(err)
                    throw err
                }

                if(result.length != 0){
                    
                    db.collection('planets').deleteOne({"name": name}, (err, result) => {
                        if(err){
                            console.log(err)
                            res.status(500).send({message: "planeta a ser deletado não existe"})
                            throw err
                        }
        
                        if(result)
                            res.status(200).send({message: "planet deleted"})
                        else
                            res.status(404).send({message: "Planeta esse que você pesquisa existir não pode..."})
                        
                    })
                }
                    
                else
                    res.status(404).send({message: "Planeta esse que você busca existir não pode..."})
                
            })
          })
    }
}