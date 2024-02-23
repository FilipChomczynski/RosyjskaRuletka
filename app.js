const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.static('files'))

const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})