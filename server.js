// Módulo que carga las variables del archivo .env en las variables de entorno
require('dotenv').config();

// Módulo para la creación de servidor http.
const express = require('express');
// Middleware log de eventos de express.
const morgan = require('morgan');
// Módulo que evita conflictos en la base de datos cuando se realicen peticiones en el servidor local
const cors = require('cors');

const { PORT } = process.env;
const getInitController = require('./controllers/getInit.js');
const getTeamController = require('./controllers/getTeam.js');
const getSeasonController = require('./controllers/getSeason.js');
const getPlayerController = require('./controllers/getPlayer.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));

// Rutas
app.get('/', getInitController);
app.get('/:team', getTeamController);
app.get('/:team/:season', getSeasonController);
app.get('/:team/:season/:player', getPlayerController);

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
