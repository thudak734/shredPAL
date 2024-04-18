import React from 'react'

const StarRating = ({rating}) => {
    const stars = [];
    for(let i = 1; i <=5; i++){
        if (i <= rating){
            stars.push(<i key={i} className="fa-solid fa-star"></i>)
        }else{
            stars.push(<i key={i} className="fa-regular fa-star"></i>)
        }}
     
  return (
  
   <>
   {stars}
   </>
  )
}

export default StarRating
