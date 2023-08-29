/* Forma asíncrono con async/await en ESM */
import { readFile } from 'node:fs/promises'

Promise.all([
    readFile('./archivo.txt', 'utf-8'),
    readFile('./archivo2.txt', 'utf-8')
]).then(([_text, _secondText]) => {
    console.log(_text)
    console.log(_secondText)
})
