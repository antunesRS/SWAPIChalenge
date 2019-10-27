const axios = require('axios').default;

module.exports = {
    findByName : (name) => {
        return axios.get(`https://swapi.co/api/planets/?search=${name}`)
    }
}