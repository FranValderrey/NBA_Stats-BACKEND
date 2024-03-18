const db = require('../db/db.js');

const getPlayerController = async (req, res, next) => {
  try {
    //const nombreEquipo = req.params.team;
    const temporadaCodificada = req.params.season;
    const temporada = decodeURIComponent(temporadaCodificada);
    const codigoJugador = req.params.player;

    const connection = await db.getConnection();

    // Obtener las estadísticas del jugador en esa temporada
    const [estadisticas] = await connection.execute(
      `
      SELECT j.nombre AS nombre_jugador, e.*
      FROM Jugadores j
      INNER JOIN Estadisticas e ON j.codigo = e.jugador
      WHERE e.jugador = ? AND e.temporada = ?
    `,
      [codigoJugador, temporada]
    );

    await connection.release();

    if (estadisticas.length === 0) {
      return res.status(404).json({
        status: 'error',
        message:
          'No hay estadísticas disponibles para ese jugador en esa temporada',
      });
    }

    res.status(200).json({ status: 'success', estadisticas });
  } catch (error) {
    next(error);
  }
};

module.exports = getPlayerController;
