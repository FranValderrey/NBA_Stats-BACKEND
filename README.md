#NBA_Stats BACKEND

Sitio web donde consultar las estadísticas proporcionadas por nuestra base de datos

##Entidades

    · Jugadores:
        - código(id)
        - nombre
        - procedencia
        - altura
        - peso
        - posición
        - nombre_equipo

    · Equipos:
        - nombre
        - ciudad
        - conferencia
        - división
        - descripción

    · Partidos:
        - código(id)
        - equipo_local
        - equipo_visitante
        - puntos_local
        - puntos_visitante
        - temporada

    · Estadísticas:
        - temporada
        - jugador(id)
        - puntos_por_partido
        - asistencias_por_partido
        - tapones_por_partido
        - rebotes_por_partido

##Endpoints

    · GET / Página principal con todos los equipos
    · GET /:name Página de cada equipo
    · GET /:name/:year Página con estadísticas y jugadores en plantilla de un equipo en una temporada concreta
    · GET /:team/:season/:player Estadísticas de un jugador en una temporada concreta
