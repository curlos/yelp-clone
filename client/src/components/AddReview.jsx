import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'

const AddReview = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState('')

  const handleSubmitReview = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(`http://localhost:3001/api/v1/restaurants/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      })
      navigate('/')
      navigate(location.pathname)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group w-100">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group w-100">
            <div>
              <label htmlFor="rating">Rating</label>
            </div>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="custom-select w-100 h-100"
            >
              <option>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Review">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            id="Review"
            className="form-control"
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={handleSubmitReview}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddReview