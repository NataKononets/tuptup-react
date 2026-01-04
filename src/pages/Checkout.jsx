import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { t } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const generateOrderNumber = () =>
    `TUP-${Date.now().toString().slice(-6)}`;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && value.length > 40) return;
    if (name === "email" && value.length > 50) return;
    if (name === "address" && value.length > 80) return;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      alert(t("CHECKOUT_FILL_ALL"));
      return;
    }

    if (!isEmailValid(form.email)) {
      alert(t("CHECKOUT_INVALID_EMAIL"));
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setOrderNumber(generateOrderNumber());
      clearCart();
    }, 2000);
  };

  if (cart.length === 0 && !success) {
    return (
      <div className="container py-5 text-center">
        <h2>{t("CHECKOUT_EMPTY")} 🛒</h2>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-3">
          {t("CHECKOUT_SUCCESS_TITLE")} 🎉
        </h2>

        <p className="fs-5">
          {t("CHECKOUT_SUCCESS_TEXT")}
        </p>

        <p className="text-muted">
          {t("CHECKOUT_ORDER")} <strong>{orderNumber}</strong>
        </p>

        <div className="mt-4">
          <span className="badge bg-success fs-6 px-4 py-2">
            {t("CHECKOUT_PAYMENT_CONFIRMED")}
          </span>
        </div>

        <p className="text-muted mt-4">
          {t("CHECKOUT_ADMIN")}
        </p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">
        {t("CHECKOUT_TITLE")}
      </h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="border p-4 rounded">

            <div className="mb-3">
              <label className="form-label">
                {t("CHECKOUT_NAME")}
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                placeholder={t("CHECKOUT_NAME_PH")}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                {t("CHECKOUT_EMAIL")}
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                placeholder={t("CHECKOUT_EMAIL_PH")}
                required
              />
              <div className="form-text">
                {t("CHECKOUT_EMAIL_HELP")}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">
                {t("CHECKOUT_ADDRESS")}
              </label>
              <textarea
                name="address"
                className="form-control"
                rows="3"
                value={form.address}
                onChange={handleChange}
                placeholder={t("CHECKOUT_ADDRESS_PH")}
                required
              />
            </div><div className="d-flex justify-content-between fw-bold fs-5 mb-3">
              <span>{t("CHECKOUT_TOTAL")}</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 py-2"
              disabled={loading}
            >
              {loading
                ? t("CHECKOUT_PROCESSING")
                : t("CHECKOUT_PAY")}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}