import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import AVG_RatingStars from './AVG_RatingStars';

const Card = ( {id, data} ) => {
  return (
    <>
      <div className='text-gray-500 w-[200px] h-[300px] bg-black' id={id}>
        <span className='flex p-[2px] justify-end'>
          {/* simbols for add to wishlist and for add to cart (maybe only wishlist) */}
          <FaRegStar />
          <FaStar fill='yellow'/> {/* only on click  */}
        </span>
        <img className='w-full h-[60%] bg-blue-500' src="" alt={data['name']} />
        <div className='p-1 w-full h-full'>
          <AVG_RatingStars rating={.2 /* data['average_rating'] */}/>
          <h3>{data['name']}</h3>
          <p>{data['description']}</p> {/* maybe only on hover idk */}
          <span className='flex justify-between'>
            <p>{data['price']}</p>
            <p>{data['quantity']}</p>
          </span>
        </div>
      </div>
    </>
  )
}

export default Card