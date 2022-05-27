const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3002

app.use((req, res, next) => {
  const whitelist = ['http://127.0.0.1', 'https://pingpwned.github.io']
  const origin = req.headers.origin
  if (whitelist.indexOf(origin) > -1) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  next()
})

app.use(cors())

app.get('/calc', (req, res) => {
  const amount = parseInt(req.query.amount, 10)
  const term = parseInt(req.query.term, 10)

  const iRate = 0.2

  const totalRepayableAmount = amount + amount * iRate
  const monthlyPayment = totalRepayableAmount / term

  const obj = {
    total: amount.toString(),
    term: term.toString(),
    totalCost: amount / 10,
    monthlyPayment,
    totalRepayableAmount,
  }
  res.json(obj)
})

app.get('/intervals', (_, res) => {
  const obj = {
    amountInterval: { min: 10, max: 2000, step: 10, defaultValue: 400 },
    termInterval: { min: 3, max: 30, step: 1, defaultValue: 15 },
  }
  res.json(obj)
})

app.get('/', (req, res) => {
  res.send(
    `Hello for ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`,
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
