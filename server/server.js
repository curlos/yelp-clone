require('dotenv').config()
const express = require('express')
const db = require('./db')

const app = express()

app.get('/restaurants', async (req, res) => {
  const results = await db.query('SELECT * from restaurants;')
  res.status(200).json(results)
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`)
})