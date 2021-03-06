require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./db')

const app = express()

app.use(cors())
app.use(express.json())

// Get all restaurants
app.post('/api/v1/restaurants', async (req, res) => {
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
    const restaurant = await db.query(`
      SELECT *
      FROM restaurants
        left join (
          SELECT restaurant_id,
            COUNT(*),
            TRUNC(AVG(rating), 1) as average_rating
          FROM reviews
          GROUP BY restaurant_id
        ) reviews on restaurants.id = reviews.restaurant_id where id = $1
      `, [req.params.id])
    
    const reviews = await db.query(
      `
        SELECT *
        FROM reviews
        WHERE restaurant_id = $1
      `,
      [req.params.id]
    )

    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows
      }
    })
  } catch (err) {
    console.error(err)
  }
})

// Create a restaurant
app.post('/api/v1/restaurants', async (req, res) => {
  console.log(req.body)

  try {
    const results = await db.query('INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *', [req.body.name, req.body.location, req.body.price_range])
    console.log(results)
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

// Update a restaurant
app.put('/api/v1/restaurants/:id', async (req, res) => {
  console.log(req.body)

  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    )

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

// Delete a restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {

  try {
    const results = await db.query("DELETE FROM restaurants where id = $1 returning *", [req.params.id])
    console.log(results)

    res.status(204).json({
      status: "success",
    })
  } catch (err) {
    console.error(err)
  }
})

// Delete a restaurant
app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {

  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    )

    console.log(newReview)

    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0]
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