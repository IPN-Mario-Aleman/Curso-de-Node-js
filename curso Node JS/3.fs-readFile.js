/* Forma asíncrono */
const fs = require('node:fs')

console.log('Leyendo el primer archivo .....')

fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
    console.log(text)
})

console.log('----> Haciendo cosas asincrono ... :3')

fs.readFile('./archivo2.txt', 'utf-8', (err, secondText) => {
    console.log(secondText)
})