import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card h-100">
      <img src={product.image} alt={product.title} />

      <h5>{product.title}</h5>
      <p>${product.price.toFixed(2)}</p>

      <button
        className="btn tup-btn w-100"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}