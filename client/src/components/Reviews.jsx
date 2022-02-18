import React from 'react'
import StarRating from './StarRating'

const Reviews = ({ reviews }) => {

  console.log(reviews)


  return (
    <div className="d-flex flex-wrap justify-content-between gap-3 text-white">
      {reviews.map((review) => (
        <div className="bg-primary p-2 flex-1">
          <div className="d-flex justify-content-between">
            <div>{review.name}</div>
            <div><StarRating rating={review.rating} /></div>
          </div>
          <div>
            {review.review}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Reviews