const db = require('../db/db');

const getSeasonController = async (req, res, next) => {
  try {
    const nombreEquipo = req.params.team;
    const temporadaCodificada = req.params.season;
    const temporada = decodeURIComponent(temporadaCodificada);

    const connection = await db.getConnection();

    // Obtener información de los partidos
    const [partidos] = await connection.execute(
      'SELECT * FROM Partidos WHERE (equipo_local = ? OR equipo_visitante = ?) AND temporada = ?',
      [nombreEquipo, nombreEquipo, temporada]
    );

    // Obtener información de los jugadores y sus estadísticas
    const [jugadores] = await connection.execute(
      `
      SELECT j.nombre AS nombre_jugador, j.codigo
      FROM Jugadores j
      INNER JOIN Estadisticas e ON j.codigo = e.jugador
      WHERE j.nombre_equipo = ? AND e.temporada = ?
    `,
      [nombreEquipo, temporada]
    );

    await connection.release();

    if (partidos.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No hay partidos disponibles para ese equipo en esa temporada',
      });
    }

    res.status(200).json({ status: 'success', partidos, jugadores });
  } catch (error) {
    next(error);
  }
};

module.exports = getSeasonController;
