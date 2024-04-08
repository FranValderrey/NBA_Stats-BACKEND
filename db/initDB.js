require('dotenv').config();

const { getConnection } = require('./db');

async function main() {
  let connection;

  try {
    connection = await getConnection();

    console.log('Borrando tablas existentes');
    await connection.query('DROP TABLE IF EXISTS Partidos');
    await connection.query('DROP TABLE IF EXISTS Estadisticas');
    await connection.query('DROP TABLE IF EXISTS Jugadores');
    await connection.query('DROP TABLE IF EXISTS Equipos');

    console.log('Creando tablas');
    await connection.query(`
    CREATE TABLE Equipos (
        nombre varchar(20) NOT NULL,
        ciudad varchar(20) DEFAULT NULL,
        conferencia varchar(4) DEFAULT NULL,
        division varchar(9) DEFAULT NULL,
        logo_url VARCHAR(255) DEFAULT NULL,
        descripcion VARCHAR(1000),
        PRIMARY KEY (nombre));
    `);

    await connection.query(`
    CREATE TABLE Jugadores (
        codigo int NOT NULL,
        nombre varchar(30) DEFAULT NULL,
        procedencia varchar(20) DEFAULT NULL,
        altura varchar(4) DEFAULT NULL,
        peso int DEFAULT NULL,
        posicion varchar(5) DEFAULT NULL,
        nombre_equipo varchar(20) DEFAULT NULL,
        PRIMARY KEY (codigo),
        FOREIGN KEY (nombre_equipo) References Equipos(nombre));
    `);

    await connection.query(`
    CREATE TABLE Estadisticas (
        temporada varchar(5) NOT NULL ,
        jugador int NOT NULL ,
        puntos_por_partido float DEFAULT NULL,
        asistencias_por_partido float DEFAULT NULL,
        tapones_por_partido float DEFAULT NULL,
        rebotes_por_partido float DEFAULT NULL,
        PRIMARY KEY (temporada,jugador),
        FOREIGN KEY (jugador) REFERENCES Jugadores(codigo)
      );
    `);

    await connection.query(`
    CREATE TABLE Partidos (
        codigo int NOT NULL,
        equipo_local varchar(20) DEFAULT NULL,
        equipo_visitante varchar(20) DEFAULT NULL,
        puntos_local int DEFAULT NULL,
        puntos_visitante int DEFAULT NULL,
        temporada varchar(5) DEFAULT NULL,
        PRIMARY KEY (codigo),
        FOREIGN KEY (equipo_local) REFERENCES Equipos(nombre),
        FOREIGN KEY (equipo_visitante) REFERENCES Equipos(nombre)
      );
    `);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
