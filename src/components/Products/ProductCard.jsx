// import { memo, useContext } from "react";
// import { NavLink } from "react-router-dom";
// import config from "../../config.json";
// import star from "../../assets/white-star.png";
// import basket from "../../assets/basket.png";
// import CartContext from "../../contexts/CartContext";
// import UserContext from "../../contexts/UserContext";

// import "./ProductCard.css";

// const ProductCard = ({ product }) => {
//   const { addToCart } = useContext(CartContext);
//   const user = useContext(UserContext);
//   return (
//     <article className="product_card">
//       <div className="product_image">
//         <NavLink to={`/product/${product?._id}`}>
//           <img
//             src={`${config.backendURL}/products/${product?.images[0]}`}
//             alt="product image"
//           />
//         </NavLink>
//       </div>

//       <div className="product_details">
//         <h3 className="product_price">${product?.price}</h3>
//         <p className="product_title">{product?.title}</p>

//         <footer className="align_center product_info_footer">
//           <div className="align_center">
//             <p className="align_center product_rating">
//               <img src={star} alt="star" /> {product?.reviews.rate}
//             </p>
//             <p className="product_review_count">{product?.reviews.counts}</p>
//           </div>

//           {product?.stock > 0 && user && (
//             <button
//               className="add_to_cart"
//               onClick={() => addToCart(product, 1)}
//             >
//               <img src={basket} alt="basket button" />
//             </button>
//           )}
//         </footer>
//       </div>
//     </article>
//   );
// };

// export default memo(ProductCard);

import { memo, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import config from "../../config.json";
import star from "../../assets/white-star.png";
import basket from "../../assets/basket.png";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import { getChatResponse } from "../../services/GeminiAiModal";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);

  // AI Summary States
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Handle AI Description Fetch
  const handleGenerateSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const prompt = `Give me a short and engaging product description for: ${product?.title}`;
      const aiResponse = await getChatResponse(prompt);
      setSummary(aiResponse);
    } catch (err) {
      setError("Error generating summary");
    }
    setLoading(false);
  };

  return (
    <article className="product_card">
      <div className="product_image">
        <NavLink to={`/product/${product?._id}`}>
          <img
            src={`${config.backendURL}/products/${product?.images[0]}`}
            alt="product image"
          />
        </NavLink>
      </div>

      <div className="product_details">
        <h3 className="product_price">${product?.price}</h3>
        <p className="product_title">{product?.title}</p>

        <footer className="align_center product_info_footer">
          <div className="align_center">
            <p className="align_center product_rating">
              <img src={star} alt="star" /> {product?.reviews.rate}
            </p>
            <p className="product_review_count">{product?.reviews.counts}</p>
          </div>

          {/* AI Summary Button */}
          {!summary && !error && (
            <button
              className="ai_summary_btn"
              onClick={handleGenerateSummary}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate AI Description"}
            </button>
          )}

          {/* View Summary Button */}
          {summary && (
            <button
              className="ai_summary_btn"
              onClick={() => setShowModal(true)}
            >
              View Summary
            </button>
          )}

          {/* Error Message */}
          {error && <p className="error_message">{error}</p>}

          {/* Add to Cart Button */}
          {product?.stock > 0 && user && (
            <button
              className="add_to_cart"
              onClick={() => addToCart(product, 1)}
            >
              <img src={basket} alt="basket button" />
            </button>
          )}
        </footer>
      </div>

      {/* AI Summary Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal_content">
            <h3>AI-Generated Summary</h3>
            <p>{summary}</p>
            <button className="close_modal" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default memo(ProductCard);
