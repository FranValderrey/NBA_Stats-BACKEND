// Módulo que carga las variables del archivo .env en las variables de entorno
require('dotenv').config();

// Módulo para la creación de servidor http.
const express = require('express');
// Middleware log de eventos de express.
const morgan = require('morgan');

const { PORT } = process.env;
const getInitController = require('./controllers/getInit.js');
const getTeamController = require('./controllers/getTeam.js');
const getSeasonController = require('./controllers/getSeason.js');

const app = express();

app.use(morgan('dev'));

// Rutas
app.get('/', getInitController);
app.get('/:team', getTeamController);
app.get('/:team/season', getSeasonController);

// Middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

// Middleware de gestión de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

// Lanzador del servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT} ❤️`);
});
