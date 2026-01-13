import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Register() {
  const { register, loginWithGoogle } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError(t("REGISTER_ERROR_REQUIRED"));
      return;
    }

    setLoading(true);
    try {
      await register(form.email, form.password);
      navigate("/checkout");
    } catch (err) {
      setError(t("REGISTER_ERROR_GENERIC"));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate("/checkout");
    } catch (err) {
      setError(t("LOGIN_GOOGLE_ERROR"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="border rounded p-4 w-100" style={{ maxWidth: 420 }}>

        <h2 className="text-center mb-2">
          {t("REGISTER_TITLE")}
        </h2>
        <p className="text-center text-muted mb-4">
          {t("REGISTER_SUBTITLE")}
        </p>

        {error && (
          <div className="alert alert-danger py-2 text-center">
            {error}
          </div>
        )}

        {/* GOOGLE */}
        <button
          type="button"
          className="btn btn-outline-dark w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
          onClick={handleGoogle}
          disabled={loading}
        >
          <span>🔐</span>
          {t("REGISTER_GOOGLE")}
        </button>

        <div className="text-center text-muted small mb-3">
          {t("OR")}
        </div>

        {/* EMAIL FORM */}
        <form onSubmit={handleSubmit} noValidate>

          <div className="mb-3">
            <label className="form-label">
              {t("EMAIL")}
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="email@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              {t("PASSWORD")}
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 py-2"
            disabled={loading}
          >
            {loading ? t("REGISTER_LOADING") : t("REGISTER_BTN")}
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-muted small">
            {t("HAVE_ACCOUNT")}
          </span>{" "}
          <Link to="/login" className="small fw-semibold text-decoration-none">
            {t("LOGIN")}
          </Link>
        </div>

      </div>
    </div>
  );
}