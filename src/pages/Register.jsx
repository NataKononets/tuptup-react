import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Register() {
  const { register } = useAuth();
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
      setError(t("REGISTER_ERROR_REQUIRED"));
      return;
    }

    setLoading(true);
    try {
      await register(form.email, form.password);
      navigate("/checkout");
    } catch (err) {
      if (err.message === "USER_EXISTS") {
        setError(t("REGISTER_ERROR_EXISTS"));
      } else {
        setError(t("REGISTER_ERROR_GENERIC"));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="border rounded p-4 w-100" style={{ maxWidth: 420 }}>
        <h2 className="text-center mb-2">{t("REGISTER_TITLE")}</h2>

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
            minLength={6}
          />

          <button className="btn btn-dark w-100" disabled={loading}>
            {loading ? t("REGISTER_LOADING") : t("REGISTER_BTN")}
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-muted small">{t("HAVE_ACCOUNT")} </span>
          <Link to="/login">{t("LOGIN")}</Link>
        </div>
      </div>
    </div>
  );
}