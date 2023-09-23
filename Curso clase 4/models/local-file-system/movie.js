/* Los modelos se encargan de toda la lógica de negocio, como consultar los datos, crearlos, etc.
    Ejemplo de un modelo:
        consultar los datos de un json (no rest) --> que bien prodria ser la base de datos.
        filtrar un los datos de las películas por genero.
*/

import { randomUUID } from 'node:crypto';
import { readJSON } from '../../utils/create-require.js';

const movies = readJSON('../movies.json');

export class MovieModel {
    static getAll({genre}) {
        // Contiene la forma de filtrar los datos y de donde se recuperan los datos --> archivo json por ahora.
        if (genre) {
            const moviesFilteredByGenre = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase()))
            // si hay peliculas filtradas por genero, retornarlas
            return moviesFilteredByGenre
        }
        return movies
    }

    static async getById({id}) {
        const movie = movies.find(movie => movie.id === id);
        return movie
    }

    static async create({movie}) {
        const newMovie = {
            id: randomUUID(),
            ...movie
        }

        movies.push(newMovie);
        return newMovie
    }

    static async delete({id}) {
        const movieIndex = movies.findIndex(movie => movie.id === id);
        if (movieIndex === -1) {
            return false
        }
        movies.splice(movieIndex, 1);
        return true
    }
    
    static async update({id, movie}) {
        const movieIndex = movies.findIndex(mov => mov.id === id);

        if (movieIndex === -1) {
            return false
        }
    
        const updateMovie = {
            ...movies[movieIndex],
            ...movie
        }
        console.log(movieIndex)
        console.log(movie)
        console.log(updateMovie)
    
        movies[movieIndex] = updateMovie;

        return updateMovie
    }
}
