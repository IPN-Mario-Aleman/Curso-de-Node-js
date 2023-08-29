const fs = require('node:fs/promsises')

fs.readdir('.', (error, files) => {
    if (error) {
        console.log('Error al leer el directorio', error)
        return;
    }
    
    files.forEach(file => {
       console.log(file) 
    })
})

fs.readdir('.')
    .then(files => {
        files.forEach(file => {
            console.log(files)
        })
    })
    .catch(error => {
        if(error) {
            console.log('Error al leer el directorio', error)
        }
    })