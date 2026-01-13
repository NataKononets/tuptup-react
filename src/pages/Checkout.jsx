import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

const initialForm = {
  name: "",
  email: "",
  address: "",
  botField: "",
};

export default function Checkout() {
  const { totalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isFormValid() {
    return (
      form.name.trim() &&
      isEmailValid(form.email) &&
      form.address.trim()
    );
  }

  function handleSubmit(e) {
    e.preventDefault();


    if (form.botField) return;

    if (!isFormValid() || loading) return;

    setLoading(true);

    setTimeout(() => {
      clearCart();
      setSuccess(true);
      setLoading(false);
    }, 1800);
  }

  return (
    <div className="container py-5" style={{ maxWidth: 620 }}>
      <h2 className="text-center mb-4">
        {t("CHECKOUT_TITLE")}
      </h2>

      {!success ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-3 p-4 shadow-sm"
          noValidate
        >
 
          <input
            type="text"
            name="botField"
            value={form.botField}
            onChange={handleChange}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="mb-3">
            <label className="form-label">
              {t("CHECKOUT_NAME")}
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder={t("CHECKOUT_NAME_PH")}
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
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
              placeholder={t("CHECKOUT_EMAIL_PH")}
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
            <div className="form-text">
              {t("CHECKOUT_EMAIL_HELP")}
            </div>
          </div>


          <div className="mb-4">
            <label className="form-label">
              {t("CHECKOUT_ADDRESS")}
            </label>
            <textarea
              name="address"
              rows="3"
              className="form-control"
              placeholder={t("CHECKOUT_ADDRESS_PH")}
              value={form.address}
              onChange={handleChange}
              autoComplete="street-address"
              required
            />
          </div>


          <div className="d-flex justify-content-between align-items-center fw-semibold fs-5 mb-4">
            <span>{t("CHECKOUT_TOTAL")}</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 py-2"
            disabled={!isFormValid() || loading}
          >
            {loading
              ? t("CHECKOUT_PROCESSING")
              : t("CHECKOUT_PAY")}
          </button>
        </form>
      ) : (
     
        <div className="text-center bg-white border rounded-3 p-5 shadow-sm">
          <h3 className="mb-3">
            {t("CHECKOUT_SUCCESS_TITLE")}
          </h3>
          <p className="text-muted mb-4">
            {t("CHECKOUT_SUCCESS_TEXT")}
          </p>

          <div className="d-flex flex-column gap-3">
            <Link to="/register" className="btn btn-dark">
              {t("CHECKOUT_CREATE_ACCOUNT")}
            </Link>

            <button
              className="btn btn-outline-dark"
              onClick={() => navigate("/")}
            >
              {t("CHECKOUT_BACK_HOME")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}