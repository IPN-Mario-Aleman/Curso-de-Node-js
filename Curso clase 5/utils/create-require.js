// Nueva forma de como se importaran los json en el futuro -->
// import movies from './movies.json' with { type: 'json' }

// forma comun de hacerlo
// const movies = readJSON('./movies.json');

// Forma de hacerlo leyendo el fichero
// import fs from 'fs';
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

export const readJSON = (path) => require(path)
