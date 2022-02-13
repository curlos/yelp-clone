require('dotenv').config()
const express = require('express')
const db = require('./db')

const app = express()

app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query('SELECT * from restaurants;')
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows
      }
    })
  } catch (err) {
    console.error(err)
  }
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`)
})