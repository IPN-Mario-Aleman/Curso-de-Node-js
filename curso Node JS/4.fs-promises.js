/* Forma asíncrono */
const fs = require('node:fs/promises')

// en caso de que modulo no contenga soporte para promesas --> /promises podemos utilizar la siguiente libreria:
// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)

console.log('Leyendo el primer archivo .....')

fs.readFile('./archivo.txt', 'utf-8')
    .then(text => console.log(text))

console.log('----> Haciendo cosas asincrono ... :3')

fs.readFile('./archivo2.txt', 'utf-8')
    .then(secondText => console.log(secondText))