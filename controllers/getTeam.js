const db = require('../db/db.js');

const getTeamController = async (req, res, next) => {
  try {
    const nombreEquipo = req.params.team;

    const connection = await db.getConnection();
    const [equipo] = await connection.execute(
      'SELECT * FROM Equipos WHERE nombre = ?',
      [nombreEquipo]
    );
    await connection.end();

    if (equipo.length === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Equipo no encontrado' });
    }

    res.status(200).json({ status: 'success', data: equipo[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = getTeamController;
