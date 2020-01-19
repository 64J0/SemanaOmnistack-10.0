const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const routes = require('./routes');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();
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

app.listen(3000, () => {
    console.log("Aplicação rodando na porta 3000");
});