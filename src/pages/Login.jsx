import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError(t("LOGIN_ERROR_REQUIRED"));
      return;
    }

    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch {
      setError(t("LOGIN_ERROR_INVALID"));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate("/");
    } catch {
      setError(t("LOGIN_ERROR_GOOGLE"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="border rounded p-4 w-100" style={{ maxWidth: 420 }}>
       
        <h2 className="text-center mb-2">{t("LOGIN_TITLE")}</h2>
        <p className="text-center text-muted mb-4">
          {t("LOGIN_SUBTITLE")}
        </p>

        {error && (
          <div className="alert alert-danger py-2 text-center">
            {error}
          </div>
        )}

        <button
          type="button"
          className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2 mb-3"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <FcGoogle size={18} />
          {t("LOGIN_GOOGLE")}
        </button>

        <div className="text-center text-muted small mb-3">
          {t("LOGIN_OR")}
        </div>

        <form onSubmit={handleSubmit} noValidate>
    
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              {t("LOGIN_EMAIL")}
            </label>
            <input
              id="email"
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

 
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              {t("LOGIN_PASSWORD")}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-control"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              minLength={6}
            />
          </div>


          <div className="d-flex justify-content-between mb-4">
            <span className="text-muted small">
              {t("LOGIN_FORGOT")}
            </span>
            <Link
              to="/reset-password"
              className="small text-decoration-none"
            >
              {t("LOGIN_RESET")}
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 py-2"
            disabled={loading}
          >
            {loading ? t("LOGIN_LOADING") : t("LOGIN_BTN")}
          </button>
        </form>

<div className="text-center mt-4">
          <span className="text-muted small">
            {t("LOGIN_NO_ACCOUNT")}
          </span>{" "}
          <Link
            to="/register"
            className="small fw-semibold text-decoration-none"
          >
            {t("LOGIN_SIGNUP")}
          </Link>
        </div>
      </div>
    </div>
  );
}