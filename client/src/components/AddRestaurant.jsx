import React, { useState, useContext } from 'react'
import { RestaurantsContext } from '../context/RestaurantsContext'
import axios from 'axios'


const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantsContext)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (name !== '' && location !== '') {
        const response = await axios.post('http://localhost:3001/api/v1/restaurants', {
          name,
          location,
          price_range: priceRange
        })
        console.log(response.data.data)
        addRestaurants(response.data.data.restaurant)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row d-flex gap-3">
          <div className="col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              type="text"
              placeholder="location"
            />
          </div>
          <div className="col w-100">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="custom-select mr-sm-2 w-100 h-100 rounded lightBorder"
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddRestaurant