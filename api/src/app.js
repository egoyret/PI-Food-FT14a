const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require("cors")
const {Recipe, Diet, conn} =  require('./db.js');

const server = express();

server.name = 'API';

// urlenconded para que se pueda parsear bien los json
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
// morgan para ver output en la consola con cada request
server.use(morgan('dev'));
// Este lo agrego yo: (es el que se usa ahora en lugar del bodyParser)
server.use(express.json());
server.use(cors())
// Con esto damos permiso para varias cosas, y evitamos errores.
// muy importante es el next para que contunue la ejecucion que sigue.
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// En /api debe ejecutar todas las rutas
server.use('/api', routes);

// Error catching endware.
// Hay que pasarle el parametro adicional err
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
