
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/products#product-${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>

      <div className="product-info">
        <span className="category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="price">{product.price} جنيه</p>
        <button onClick={() => addToCart(product)}>
          أضف إلى السلة +
        </button>
      </div>
    </article>
  );
}
