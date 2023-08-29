const http = require('node:http')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200 // OK
    res.end('<h1>Hola bienvenido a mi página</h1>')
  } else if (req.url === '/about') {
    res.statusCode = 200 // OK
    res.end('<h1>Esta es la página de about</h1>')
  } else {
    res.statusCode = 404 // Not Found
    res.end('<h1>Página no encontrada</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`)
})
