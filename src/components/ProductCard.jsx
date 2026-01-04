import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const imgSrc = product.thumbnail || product.image || "";

  return (
    <div className="product-card h-100 d-flex flex-column">
      <Link to={`/product/${product.id}`} className="text-decoration-none">
        <img
          src={imgSrc}
          alt={product.title}
          className="mb-3"
        />
      </Link>

      <h5 className="flex-grow-1">
        <Link
          to={`/product/${product.id}`}
          className="text-decoration-none text-dark"
        >
          {product.title}
        </Link>
      </h5>

      <p className="fw-semibold mb-3">
        ${Number(product.price).toFixed(2)}
      </p>

      <button
        className="btn tup-btn w-100 mt-auto"
        onClick={() => addToCart(product)}
      >
        {t("ADD_TO_CART")}
      </button>
    </div>
  );
}