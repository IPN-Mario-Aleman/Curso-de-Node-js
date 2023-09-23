const http = require('node:http')

const data = require('./pokemons/ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto': {
          res.setHeader('Content-Type', 'application/json; charset-utf-8')
          return res.end(JSON.stringify(data))
        }
        // case 'about':
        default: {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset-utf-8')
          return res.end('<h1>Página no encontrada</h1>')
        }
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          res.setHeader('Content-Type', 'application/json; charset-utf-8')
          let body = ''

          // escuchar el evento data
          req.on('data', chunk => {
            body += chunk
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            // llamar a uuna base de datos para guardar info
            res.writeHead(201, { 'Content-Type': 'application/json; chartset=utf-8' })
            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })
          break
        }
        default: {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset-utf-8')
          return res.end('<h1>Página no encontrada</h1>')
        }
      }
  }
}

const sever = http.createServer(processRequest)

const desiredPort = process.env.PORT ?? 3000

sever.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`)
})
