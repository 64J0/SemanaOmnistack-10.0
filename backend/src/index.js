const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const http = require('http');

const routes = require('./routes');
const { setupWebSocket } = require('./websocket');

const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();
const server = http.Server(app);

setupWebSocket(server);

app.use(cors());
app.use(express.json());
app.use('/', routes);

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('DB conectado!');
});

server.listen(3333, () => {
    console.log("Aplicação rodando na porta 3333");
});