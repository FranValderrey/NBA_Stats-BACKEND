const db = require('../db/db');

const getSeasonController = async (req, res, next) => {
  try {
    const nombreEquipo = req.params.team;
    const temporadaCodificada = req.query.season;

    // Decodificar la temporada si es necesario
    const temporada = decodeURIComponent(temporadaCodificada);

    const connection = await db.getConnection();
    const [partidos] = await connection.execute(
      'SELECT * FROM Partidos WHERE (equipo_local = ? OR equipo_visitante = ?) AND temporada = ?',
      [nombreEquipo, nombreEquipo, temporada]
    );
    await connection.release();

    if (partidos.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No hay estadísticas disponibles para ese año',
      });
    }

    res.status(200).json({ status: 'success', data: partidos });
  } catch (error) {
    next(error);
  }
};

module.exports = getSeasonController;
