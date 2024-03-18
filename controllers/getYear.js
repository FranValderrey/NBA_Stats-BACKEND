const db = require('../db/db.js');

const getYearController = async (req, res, next) => {
  try {
    const nombreEquipo = req.params.team;
    const { year } = req.query;

    const connection = await db.getConnection();
    const [estadisticas] = await connection.execute(
      'SELECT * FROM Estadisticas WHERE nombre_equipo = ? AND temporada = ?',
      [nombreEquipo, year]
    );
    await connection.end();

    if (estadisticas.length === 0) {
      return res
        .status(404)
        .json({
          status: 'error',
          message: 'No hay estadísticas disponibles para ese año',
        });
    }

    res.status(200).json({ status: 'success', data: estadisticas });
  } catch (error) {
    next(error);
  }
};

module.exports = getYearController;
