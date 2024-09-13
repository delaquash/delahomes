import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';

type Props = {
    rating: number;
}

const Ratings = ({ rating }: Props) => {
    const StarRatings = [];

    for(let i=1; i<=5; i++){
        if(i <= rating){
            StarRatings.push(
                <AiFillStar
                    key={i}
                    size={20}
                    color='#f6b100'
                    className='mr-2 cursor-pointer'
                />
            )
        } else if (1 === Math.ceil(rating) && !Number.isInteger(rating)){
            StarRatings.push(
                <BsStarHalf 
                    key={i}
                    size={17}
                    color='#f6b100'
                    className='mr-2 cursor-pointer'
                />
            )
        } else {
            StarRatings.push(
                <AiOutlineStar 
                    key={i}
                    size={20}
                    color='#f6b100'
                    className='mr-2 cursor-pointer'
                />
            )
        }
    }
  return (
    <div className='flex mt-1 ml-2 800px:mt-0 800px:ml-0'>{StarRatings}</div>
  )
}

export default Ratings