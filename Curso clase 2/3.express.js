const express = require('express')
const data = require('./pokemons/ditto.json')

const PORT = process.env.PORT || 3000

const app = express()
app.disable('x-powered-by')

app.use(express.json())

// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()
//   let body = ''

//   // escuchar el evento data
//   req.on('data', chunk => {
//     body += chunk
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     req.body = data
//     // Mutar la request y meter la información en el req.body
//     next()
//   })
// })

app.get('/pokemon/ditto', (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset-utf-8')
  return res.end(JSON.stringify(data))
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

/* La ultima ruta donde va a llegar */
app.use((req, res) => {
  res.status(404).send('<h1>Página no encontrada</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port: http://localhost:${PORT}`)
})
