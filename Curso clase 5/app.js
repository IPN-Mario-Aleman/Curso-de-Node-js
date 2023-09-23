import express, { json } from 'express';
import { middlewareCors } from './middleware/cors.js';
import { moviesRouter } from './routes/movies.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(json()); // habilitar el req.body
app.use(middlewareCors())
app.disable('x-powered-by'); //deshabilitar el header X-Powered-By: Express

app.use('/movies', moviesRouter)

app.listen(PORT, () => {
    console.log(`server listening on port: http://localhost:${PORT}`)
})
  