import React, { useEffect, useContext } from 'react'
import { RestaurantsContext } from '../context/RestaurantsContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import StarRating from './StarRating'

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/restaurants')
        console.log(response.data.data)
        setRestaurants(response.data.data.restaurants)
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

  console.log(restaurants)

  return (
    <div className="list-group">
      <table className="table table-hover">
        <thead>
          <tr className="bg-primary text-white">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                  key={restaurant.id}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, restaurant.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, restaurant.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {/* <tr>
          <td>mcdonalds</td>
          <td>New YOrk</td>
          <td>$$</td>
          <td>Rating</td>
          <td>
            <button className="btn btn-warning">Update</button>
          </td>
          <td>
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
        <tr>
          <td>mcdonalds</td>
          <td>New YOrk</td>
          <td>$$</td>
          <td>Rating</td>
          <td>
            <button className="btn btn-warning">Update</button>
          </td>
          <td>
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr> */}
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList