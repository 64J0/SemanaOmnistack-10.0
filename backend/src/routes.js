const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:

// Query Params: request.query (filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

routes.post('/devs', DevController.store);

// Função para verificar os arquivos salvos no banco de dados

routes.get('/devs', DevController.showData);

// Função para deletar um dev do banco de dados a partir do Id

routes.delete('/devs/:id', DevController.deleteData);

routes.get('/search', SearchController.index);

module.exports = routes;