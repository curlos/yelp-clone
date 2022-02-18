import React, { useEffect, useContext } from 'react'
import RestaurantContext from '../context/RestaurantsContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/restaurants')
        console.log(response.data.data)
        setRestaurants(response.data.data)
      } catch (err) {

      }
    }

    fetchData()
  }, [])

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    try {
      const response = await axios.delete(`http://localhost:3001/api/v1/restaurants/${id}`)
      setRestaurants(restaurants.filter((restaurant) => {
        return restaurant.id !== id
      }))
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdate = (e, id) => {
    e.stopPropagation()
    navigate(`/restaurants/${id}/update`)
  }

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`)
  }

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return (
        <span className="text-warning ml-1">
          0 reviews
        </span>
      )
    }

    return (
      <>
        <StarRating rating={restaurant.id} />
        <span className="text-warning ml-1">({restaurant.count}</span>
      </>
    )
  }

  return (
    <div>

    </div>
  )
}

export default RestaurantList