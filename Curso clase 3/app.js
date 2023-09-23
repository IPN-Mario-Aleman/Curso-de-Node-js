const express = require('express');
const movies = require('./movies.json');
const crypto = require('node:crypto');
const cors = require('cors');
const { validateSchema, validateUpdateSchema } = require('./schemas/movies');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json()); // habilitar el req.body
app.disable('x-powered-by'); //deshabilitar el header X-Powered-By: Express
app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
                'localhost:8080',
                'http://127.0.0.1:5500',
                'http://localhost:5500',
                'http://localhost:3000',
                'http://000000000:3000',
            ]
        if(ACCEPTED_ORIGINS.includes(origin) || !origin) {
            return callback(null, true)
        }
        
        return callback(new Error('Origin not allowed'))
    }
}))

app.get('/', (req, res) => {
    res.json({ message: 'Hola mundo'})
})

// const ACCEPTED_ORIGINS = [
//     'localhost:8080',
//     'http://127.0.0.1:5500',
//     'http://localhost:5500',
//     'http://localhost:3000',
//     'http://000000000:3000',
// ]

// Tados los recursos que sean movies se identifica con /movies y
// Buscar una película por genero desde un query string
app.get('/movies', (req, res) => {
    // const origin = req.header('origin');
    // console.log('origin', origin)

    // if(ACCEPTED_ORIGINS.includes(origin) || !origin) {
    //     res.header('Access-Control-Allow-Origin', origin)
    // }

    const { genre } = req.query

    if (genre) {
        const moviesFilteredByGenre = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase()))
        // si hay peliculas filtradas por genero, retornarlas
        return res.json(moviesFilteredByGenre);
    }

    res.json(movies)
})

// Buscar una pelicula por ID
app.get('/movies/:id', (req, res) => {  // path to regexp
    const { id } = req.params;
    const movie = movies.find(movie => movie.id === id);
    if (movie) return res.json(movie);

    res.status(404).json({ message: 'Movie not found' })
})

// Crear una película
app.post('/movies', (req, res) => {
    console.log('req.body', req.body)

    const result = validateSchema(req.body);

    if(result.error) {
        res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }

    // Esto no es REST, por que estamos guardando el estado de la aplicación en memoria
    movies.push(newMovie);
    res.status(201).json(newMovie);
})

// modificar una película
app.patch('/movies/:id', (req, res) => {
    console.log('req.body', req.body)

    const result = validateUpdateSchema(req.body);
    // console.log('asdasd', result)

    if(result.error) {
        res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    
    const { id } = req.params;
    // console.log('id', id)
    const movieIndex = movies.findIndex(movie => movie.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' })
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    console.log('updateMovie', updateMovie)

    movies[movieIndex] = updateMovie;

    return res.json(updateMovie);
})

// Eliminar una película
app.delete('/movies/:id', (req, res) => {
    // const origin = req.header('origin');
    // console.log('origin', origin)

    // if(ACCEPTED_ORIGINS.includes(origin) || !origin) {
    //     res.header('Access-Control-Allow-Origin', origin)
    // }

    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' })
    }

    movies.splice(movieIndex, 1);
    return res.json({ message: 'Movie deleted' });
})

// app.options('movies/:id', (req, res) => {
//     const origin = req.header('origin');
//     if(ACCEPTED_ORIGINS.includes(origin) || !origin) {
//         res.header('Access-Control-Allow-Origin', origin)
//         res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
//     }
//     res.send(200)
// })

app.listen(PORT, () => {
    console.log(`server listening on port: http://localhost:${PORT}`)
})
  