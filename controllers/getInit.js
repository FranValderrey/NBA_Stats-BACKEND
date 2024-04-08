const db = require('../db/db.js');

const getInitController = async (req, res, next) => {
  try {
    const connection = await db.getConnection();
    const [equipos] = await connection.execute(
      'SELECT nombre, logo_url FROM Equipos'
    );
    await connection.release();

    res.status(200).json({ status: 'success', data: equipos });
  } catch (error) {
    next(error);
  }
};

module.exports = getInitController;
