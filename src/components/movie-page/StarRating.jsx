// import React, { useState, useEffect } from "react";

// const StarRating = (props) => {
  
//   const [hover, setHover] = useState(0);
//   return (
//     <div className="star-rating">
//       {[...Array(10)].map((star, index) => {
//         index += 1;
//         return (
//           <button
//             type="button"
//             key={index}
//             className={index <= (hover || props.ratingScore) ? "on" : "off"}
//             onClick={() => props.ratingFunction(index)}
//             onMouseEnter={() => setHover(index)}
//             onMouseLeave={() => setHover(props.ratingScore)}
//           >
//             <span className="star"><i class="fa fa-star fa-2x"></i></span>
//           </button>
//         );
//       })}
//     </div>
//   );
// };

// export default StarRating;
