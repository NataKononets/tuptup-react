import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container py-4">
        <div className="row gy-4">

          {/* BRAND */}
          <div className="col-md-3">
            <h5>TupTup</h5>
            <p className="small">
              Best store for little explorers
            </p>
          </div>

          {/* NAVIGATION */}
          <div className="col-md-3">
            <h6>Navigation</h6>
            <ul className="footer-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* HELP */}
          <div className="col-md-3">
            <h6>Help</h6>
            <ul className="footer-list">
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Refund</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="col-md-3">
            <h6>Social</h6>
            <div className="social-icons">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noreferrer"
              >
                <FaTelegramPlane />
              </a>
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaTiktok />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}