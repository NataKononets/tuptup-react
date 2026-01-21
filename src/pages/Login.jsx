import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
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

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="border rounded p-4 w-100" style={{ maxWidth: 420 }}>
        <h2 className="text-center mb-2">{t("LOGIN_TITLE")}</h2>

        {error && (
          <div className="alert alert-danger text-center py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            className="form-control mb-3"
            placeholder="email@example.com"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            className="form-control mb-4"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
          />

          <button className="btn btn-dark w-100" disabled={loading}>
            {loading ? t("LOGIN_LOADING") : t("LOGIN_BTN")}
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-muted small">{t("LOGIN_NO_ACCOUNT")} </span>
          <Link to="/register">{t("LOGIN_SIGNUP")}</Link>
        </div>
      </div>
    </div>
  );
}