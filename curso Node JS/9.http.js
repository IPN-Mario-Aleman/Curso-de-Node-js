const { findAvailablePort } = require('./10.free-port.js')
const http = require('node:http')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('Request received')
  res.end('Hello World')
})

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
  })
})

// server.listen(0, () => { // para que busque algún puerto disponible se setea el purto 0
//   console.log(`Server listening on port http://localhost:${server.address().port}`)
// })
