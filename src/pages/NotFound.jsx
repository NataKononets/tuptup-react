import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

    return (
    <div className="container py-5 text-center">
        <h1 className="display-4 fw-bold mb-3">
            404
        </h1>
        <p className="fs-4 mb-4">
            {t("NOT_FOUND_TEXT")}
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
            {t("NOT_FOUND_GO_HOME")}
        </Link>
    </div>
  );
}
