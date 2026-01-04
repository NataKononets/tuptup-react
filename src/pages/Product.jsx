import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../hooks/useProducts";
import { useLanguage } from "../context/LanguageContext";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const { t } = useLanguage();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setActiveImage(data.thumbnail);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center py-5">{t("PRODUCT_LOADING")}</p>;
  }

  if (!product) {
    return <p className="text-center py-5">{t("PRODUCT_NOT_FOUND")}</p>;
  }

  const relatedProducts = products
    .filter(
      p => p.category === product.category && p.id !== product.id
    )
    .slice(0, 4);

  return (
    <section className="container py-5">

      <button
        className="btn btn-link mb-4 px-0"
        onClick={() => navigate("/shop")}
      >
        ← {t("BACK_TO_SHOP")}
      </button>

      <div className="row g-5 align-items-start">

        <div className="col-12 col-md-6">
          <img
            src={activeImage}
            alt={product.title}
            className="img-fluid mb-3 rounded"
          />

          <div className="d-flex gap-2 flex-wrap">
            {product.images.map(img => (
              <img
                key={img}
                src={img}
                alt=""
                width="70"
                className={`rounded cursor-pointer ${
                  img === activeImage ? "border border-dark" : ""
                }`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="col-12 col-md-6">
          <h2 className="mb-3">{product.title}</h2>

          <p className="text-muted">
            {t("CATEGORY")}: {product.category}
          </p>

          <h3 className="mb-3">${product.price}</h3>

          <p className="mb-4">{product.description}</p>

          <div className="d-flex align-items-center gap-3 mb-4">
            <button
              className="btn btn-outline-dark"
              onClick={() => setQty(q => Math.max(1, q - 1))}
            >
              <FiMinus />
            </button>

            <span className="fs-5 fw-semibold">{qty}</span>

            <button
              className="btn btn-outline-dark"
              onClick={() => setQty(q => q + 1)}
            >
              <FiPlus />
            </button>
          </div>

          <button
            className="btn tup-btn px-5 py-2"
            onClick={() => addToCart(product, qty)}
          >
            {t("ADD_TO_CART")} ({qty})
          </button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <>
          <h4 className="mt-5 mb-4">{t("RELATED_PRODUCTS")}</h4>

          <div className="row g-4">
            {relatedProducts.map(p => (
              <div key={p.id} className="col-6 col-md-3">
                <div className="product-card h-100">
                  <Link to={`/product/${p.id}`}>
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      className="img-fluid mb-2"
                    />
                  </Link>

                  <h6>
                    <Link
                      to={`/product/${p.id}`}
                      className="text-decoration-none text-dark">
                      {p.title}
                    </Link>
                  </h6>

                  <p className="fw-semibold">${p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}