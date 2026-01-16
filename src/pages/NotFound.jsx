import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container py-5 text-center">
      <h1 className="display-4 fw-bold mb-3">404</h1>

      <p className="fs-4 mb-2">
        {t("NOT_FOUND_TEXT")}
      </p>

      <p className="text-muted mb-4">
        {t("NOT_FOUND_REDIRECT")}
      </p>

      <Link to="/" className="btn btn-primary btn-lg">
        {t("NOT_FOUND_GO_HOME")}
      </Link>
    </div>
  );
}