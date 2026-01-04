import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

export default function Cart() {
  const {
    cart,
    addToCart,
    decreaseQty,
    removeFromCart,
    totalPrice,
    totalCount,
  } = useCart();

  const { t } = useLanguage();

  if (cart.length === 0) {
    return (
      <section className="container py-5 text-center">
        <h2 className="mb-3">{t("CART_EMPTY_TITLE")} 🛒</h2>
        <p className="text-muted mb-4">
          {t("CART_EMPTY_TEXT")}
        </p>
        <Link to="/shop" className="btn btn-dark px-4">
          {t("CART_GO_SHOP")}
        </Link>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <h2 className="fw-bold mb-4">{t("CART_TITLE")}</h2>

      <div className="row g-4">
    
        <div className="col-lg-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="d-flex align-items-center gap-3 mb-4 border-bottom pb-3"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                width="80"
                className="rounded"
              />

              <div className="flex-grow-1">
                <h5 className="mb-1">{item.title}</h5>
                <p className="text-muted mb-2">
                  ${item.price.toFixed(2)} × {item.qty}
                </p>

                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-light border"
                    onClick={() => decreaseQty(item.id)}
                    disabled={item.qty === 1}
                  >
                    <FiMinus />
                  </button>

                  <span className="fw-semibold">{item.qty}</span>

                  <button
                    className="btn btn-light border"
                    onClick={() => addToCart(item)}
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              <div className="text-end">
                <p className="fw-semibold mb-2">
                  ${(item.price * item.qty).toFixed(2)}
                </p>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="p-4 rounded bg-light shadow-sm position-sticky top-0">
            <h4 className="fw-bold mb-3">
              {t("CART_SUMMARY")}
            </h4>

            <div className="d-flex justify-content-between mb-2">
              <span>{t("CART_ITEMS")}</span>
              <span>{totalCount}</span>
            </div>

            <div className="d-flex justify-content-between fw-semibold fs-5">
              <span>{t("CART_TOTAL")}</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="btn btn-danger w-100 mt-4"
            >
              {t("CART_CHECKOUT")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}