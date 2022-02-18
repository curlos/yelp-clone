import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import StarRating from '../components/StarRating'
import AddReview from '../components/AddReview'
import Reviews from '../components/Reviews'

const RestaurantDetailPage = () => {
  const { id } = useParams()

  const [restaurant, setRestaurant] = useState()
  const [reviews, setReviews] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3001/api/v1/restaurants/${id}`)
      console.log(response.data.data)
      setRestaurant(response.data.data.restaurant)
      setReviews(response.data.data.reviews)
      setLoading(false)
    }
    fetchData()
  }, [id])

  console.log(id)
  console.log(restaurant)
  console.log(reviews)

  return (
    <div className="p-3">
      {loading ? <div>Loading...</div> : (
        <div>
          <h1 className="text-center display-1">
            {restaurant.name}
          </h1>

          <div className="text-center">
            <StarRating rating={restaurant.average_rating} />
            <span className="text-warning ml-1">
              {restaurant.count ?
                `(${restaurant.count})`
                : '(0)'}
            </span>
          </div>

          <div>
            <Reviews reviews={reviews} />
          </div>
          <AddReview />
        </div>
      )}
    </div>
  )
}

export default RestaurantDetailPage