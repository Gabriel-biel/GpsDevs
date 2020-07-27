const express = require("express");
const mongoose = require("mongoose");

const { setupWebSocket } = require("./websocket");

const http = require("http");

const cors = require("cors");

const routes = require("./routes");

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect("mongodb+srv://oministack:oministack@cluster0.ritaf.mongodb.net/week10?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
//Metodos HTTP: GET, POST, PUT, DELETE

// Tipos de Parâmetros:

//Query Params: req.query (filtros, ordenação, paginação)
//Route Params: req.params (Identificar um recurso na alteração ou remoção)
//Body: request.body (Dados para criação ou para alteração de um registro)

//MongoDB

app.use(routes);

server.listen(3333);  