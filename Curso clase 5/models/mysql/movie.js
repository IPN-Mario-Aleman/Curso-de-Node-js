import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'root',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if(genre) {
        const toLowerCaseGenre = genre.toLowerCase()

        const [genres] = await connection.query(
                `select id, name from genre where lower(name) = ?;`,
                [toLowerCaseGenre]
            )

        if(genres.length === 0) {
            return []
        }

        const [{id}] = genres

    } else {
        const [movies] = await connection.query(`
            select title, year, director, duration, poster, rate, BIN_TO_UUID(id) id from movie
        `)
    
        return movies
    }
  }

  static async getById ({ id }) {

  }

  static async create ({ input }) {

  }

  static async delete ({ id }) {

  }

  static async update ({ id, input }) {

  }
}