const axios = require("axios");
const Dev = require("../models/Dev");
const ParseStringAsArray = require("../utils/ParseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

//index --> mostrar lista do recurso, no caso DevController
//show --> para mostrar uma unica informação, no caso um único desenvolvedor(a)
//store --> para criar informação, no caso criar um desenvolvedor(a)
//update --> para alterar
//destroy --> para deletar

module.exports = {
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response){
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login , avatar_url, bio } = apiResponse.data;

            const arrayTechs = ParseStringAsArray(techs);

            const location = {
                type: "Point",
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: arrayTechs,
                location,
            });
            //Filtrar as conexões a no máximo 10km de distância e que o novo dev tenha 
            //pelo menos 1 das tecnologias filtradas
            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                arrayTechs,
            );
                sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
        return response.json(dev);
    }

}