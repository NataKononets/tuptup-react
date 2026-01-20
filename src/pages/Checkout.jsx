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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  /* ===== VALIDATORS ===== */

  function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isNameValid(name) {
  
    return /^[A-Za-zА-Яа-яЁёІіЇїЄє\s]{2,}$/.test(name.trim());
  }

  function validateField(name, value) {
    switch (name) {
      case "name":
        if (!value.trim()) return t("CHECKOUT_ERROR_NAME_REQUIRED");
        if (!isNameValid(value)) return t("CHECKOUT_ERROR_NAME");
        return "";

      case "email":
        if (!value.trim()) return t("CHECKOUT_ERROR_EMAIL_REQUIRED");
        if (!isEmailValid(value)) return t("CHECKOUT_ERROR_EMAIL");
        return "";

      case "address":
        if (!value.trim()) return t("CHECKOUT_ERROR_ADDRESS");
        return "";

      default:
        return "";
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  }

  function isFormValid() {
    return (
      isNameValid(form.name) &&
      isEmailValid(form.email) &&
      form.address.trim()
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.botField) return;

    const newErrors = {
      name: validateField("name", form.name),
      email: validateField("email", form.email),
      address: validateField("address", form.address),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) return;

    setLoading(true);

    setTimeout(() => {
      clearCart();
      setSuccess(true);
      setLoading(false);
    }, 1800);
  }

  return (
    <div className="container py-5" style={{ maxWidth: 620 }}>
      <h2 className="text-center mb-4">{t("CHECKOUT_TITLE")}</h2>

      {!success ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-3 p-4 shadow-sm"
          noValidate
        >
          {/* honeypot */}
          <input
            type="text"
            name="botField"
            value={form.botField}
            onChange={handleChange}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* NAME */}
          <div className="mb-3">
            <label className="form-label">{t("CHECKOUT_NAME")}</label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label">{t("CHECKOUT_EMAIL")}</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email ? (
              <div className="invalid-feedback">{errors.email}</div>
            ) : (
            <div className="form-text">{t("CHECKOUT_EMAIL_HELP")}</div>
            )}
          </div>

          {/* ADDRESS */}
          <div className="mb-4">
            <label className="form-label">{t("CHECKOUT_ADDRESS")}</label>
            <textarea
              name="address"
              rows="3"
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              value={form.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
          </div>

          {/* TOTAL */}
          <div className="d-flex justify-content-between fw-semibold fs-5 mb-4">
            <span>{t("CHECKOUT_TOTAL")}</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn btn-dark w-100 py-2"
            disabled={!isFormValid() || loading}
          >
            {loading ? t("CHECKOUT_PROCESSING") : t("CHECKOUT_PAY")}
          </button>
        </form>
      ) : (
        <div className="text-center bg-white border rounded-3 p-5 shadow-sm">
          <h3 className="mb-3">{t("CHECKOUT_SUCCESS_TITLE")}</h3>
          <p className="text-muted mb-4">{t("CHECKOUT_SUCCESS_TEXT")}</p>

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