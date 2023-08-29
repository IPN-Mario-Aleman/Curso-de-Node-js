const path = require('node:path')

// barra separadora segun SO
console.log(path.sep)

// unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

// obtener nombre de archivo'
const base = path.basename(filePath)
console.log(base)

// sin extension
const fileName = path.basename(filePath, '.txt')
console.log(fileName)

// nombre de la extension
const ext = path.extname(filePath)
console.log(ext)

// obtener ruta absoluta
const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt')
console.log(absolute)