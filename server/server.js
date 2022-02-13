require('dotenv').config()
const express = require('express')
const db = require('./db')

const app = express()

// Get all restaurants
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

// Get a restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const results = await db.query('select * from restaurants where id = $1', [req.params.id])
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0]
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