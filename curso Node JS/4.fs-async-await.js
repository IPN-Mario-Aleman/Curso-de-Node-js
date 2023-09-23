/* Forma asíncrono con async/await con cjs */
const fs = require('node:fs/promises')

// IIFE - Inmediately Invoked Function Expression // esta tiene una función anónima
;(
  async () => {
    console.log('Leyendo el primer archivo .....')

    const text = await fs.readFile('./archivo.txt', 'utf-8')
    console.log(text)

    console.log('----> Haciendo cosas asincrono ... :3')

    const secondText = await fs.readFile('./archivo2.txt', 'utf-8')
    console.log(secondText)
  }
)()

// ===>
/*
    Lo anterior es lo mismo que lo siguiente:
    async function main() {
        console.log('Leyendo el primer archivo .....')

        const text = await fs.readFile('./archivo.txt', 'utf-8')
        console.log(text)

        console.log('----> Haciendo cosas asincrono ... :3')

        const secondText = await fs.readFile('./archivo2.txt', 'utf-8')
    }

    main()
*/
