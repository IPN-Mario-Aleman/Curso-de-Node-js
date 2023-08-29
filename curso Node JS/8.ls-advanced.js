const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch (error) {
    console.log(pc.red(`No se pudo leer el directorio ${folder}`))
    process.exit(1)
  }

  const filesPromises = files.map(async file => {
    const filesPath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filesPath) // status - información del archivo
    } catch (error) {
      console.log(pc.red(`No se pudo leer el directorio ${file}`))
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleString()

    return `${fileType} ${pc.blue(file.padEnd(30))} ${pc.green(fileSize.toString().padStart(10))} ${pc.yellow(fileModified)}`
  })

  const filesInfo = await Promise.all(filesPromises)

  filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)
