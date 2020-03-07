const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;
    
        try {

            let dev = await Dev.findOne({ github_username });

            if(!dev) {
                const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
                const { name = login, avatar_url, bio } = apiResponse.data;
        
                /*
                if (!name) {
                    name = apiResponse.data.login;
                }
                */
        
                const techsArray = parseStringAsArray(techs);
        
                const location = {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                };
        
                dev = await Dev.create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location,
                });

                // Filtrar as conexões que estão a no máximo 10km de distância, e que o novo dev tenha pelo menos uma das tecnologias filtradas

                const sendSocketMessageTo = findConnections(
                    { latitude, longitute },
                    techsArray
                );

                sendMessage(sendSocketMessageTo, 'new-dev', dev);
            }

            console.log('Usuário cadastrado.');
            return res.json(dev);
    
        } catch(e) {
            return res.send('Não foi possível cadastrar o usuário.\nErro: ' + e);
        }
        
    },
    async showData(req, res) {
        try {
            const DevsList = await Dev.find({});
            return res.json(DevsList);
        } catch(e) {
            return res.send('Usuários não recuperados.\nErro: ' + e);
        }
    },
    async deleteData(req, res) {
        try {
            await Dev.findByIdAndRemove(req.params.id);
            return res.send('Usuário deletado.');
        } catch(e) {
            console.log();
            return res.send('Usuário não deletado.\nErro: ' + e);
        }
    }
};