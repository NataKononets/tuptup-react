import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaTiktok,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container py-4">
        <div className="row gy-4">

          <div className="col-md-3">
            <h5>TupTup</h5>
            <p className="small">
              {t("FOOTER_DESC")}
            </p>
          </div>

          <div className="col-md-3">
            <h6>{t("FOOTER_NAV")}</h6>
            <ul className="footer-list">
              <li><Link to="/">{t("HOME")}</Link></li>
              <li><Link to="/shop">{t("SHOP")}</Link></li>
              <li><Link to="/categories">{t("CATEGORIES")}</Link></li>
              <li><Link to="/contact">{t("CONTACT")}</Link></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6>{t("FOOTER_HELP")}</h6>
            <ul className="footer-list">
              <li><a href="#">{t("FOOTER_SHIPPING")}</a></li>
              <li><a href="#">{t("FOOTER_REFUND")}</a></li>
              <li><a href="#">{t("FOOTER_FAQ")}</a></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6>{t("FOOTER_SOCIAL")}</h6>
            <div className="social-icons">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
              <a href="https://t.me/" target="_blank" rel="noreferrer">
                <FaTelegramPlane />
              </a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer">
                <FaTiktok />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}