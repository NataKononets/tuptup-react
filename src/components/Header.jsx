import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaTimes,
  FaShoppingCart,
  FaBars,
  FaUser,
} from "react-icons/fa";

import logo from "../assets/img/logo-temp.png";

import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { useProducts } from "../hooks/useProducts";
import { useDebounce } from "../hooks/useDebounce";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { totalCount } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();
  const { products } = useProducts();
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const debouncedQuery = useDebounce(searchQuery, 300);

  const suggestions =
    debouncedQuery.trim().length > 0
      ? products
          .filter((p) =>
            `${p.title} ${p.description} ${p.category}`
              .toLowerCase()
              .includes(debouncedQuery.toLowerCase())
          )
          .slice(0, 5)
      : [];

  function handleEnter(e) {
    if (e.key === "Enter") {
      navigate("/shop");
      setSearchOpen(false);
    }
  }

  return (
    <header className="bg-white border-bottom sticky-top">
      <div className="container py-3">
        <div className="d-flex align-items-center justify-content-between">

          <Link
            to="/"
            className="d-flex align-items-center gap-2 text-decoration-none"
            aria-label="logo"
          >
            <img src={logo} alt="TupTup" height="40" />
            <span className="fs-4 fw-bold text-dark">TupTup</span>
          </Link>

          <nav className="d-none d-md-flex gap-4" aria-label="main-navigation">
            <NavLink to="/" className="text-dark text-decoration-none">
              {t("HOME")}
            </NavLink>
            <NavLink to="/shop" className="text-dark text-decoration-none">
              {t("SHOP")}
            </NavLink>
            <NavLink to="/categories" className="text-dark text-decoration-none">
              {t("CATEGORIES")}
            </NavLink>
            <NavLink to="/contact" className="text-dark text-decoration-none">
              {t("CONTACT")}
            </NavLink>
          </nav>

          <div className="d-flex align-items-center gap-3 position-relative">

            <LanguageSwitcher />

            {!searchOpen ? (
              <button
                className="btn"
                aria-label="open-search"
                onClick={() => setSearchOpen(true)}
              >
                <FaSearch />
              </button>
            ) : (
              <div className="position-relative">
                <div className="d-flex align-items-center border rounded-pill px-3">
                  <FaSearch className="me-2 text-muted" />
                  <input
                    className="form-control border-0 shadow-none"
                    placeholder={t("SEARCH")}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      navigate("/shop");
                    }}
                    onKeyDown={handleEnter}
                    autoFocus
                    aria-label="search-input"
                  />
                  <button
                    className="btn p-0 ms-2"
                    aria-label="close-search"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchOpen(false);
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>

                {suggestions.length > 0 && (
                  <div className="position-absolute bg-white border rounded shadow mt-2 w-100 z-3">
                    {suggestions.map((item) => (
                      <Link
                        key={item.id}
                        to={`/product/${item.id}`}
                        className="d-block px-3 py-2 text-decoration-none text-dark"
                        onClick={() => setSearchOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

{user ? (
  <button
    aria-label="logout"
    className="btn btn-outline-dark d-flex align-items-center gap-2"
    onClick={logout}
  >
    <FaUser />
    <span className="d-none d-md-inline">
      {user.email}
    </span>
  </button>
) : (
  <Link
    to="/login"
    aria-label="login"
    className="btn btn-outline-dark"
  >
    <FaUser className="me-1" />
    {t("LOGIN")}
  </Link>
)}

            {/* CART */}
            <Link
              to="/cart"
              className="position-relative text-dark"
              aria-label="cart"
            >
              <FaShoppingCart />
              {totalCount > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                  {totalCount}
                </span>
              )}
            </Link>

            {/* BURGER */}
            <button
              className="btn d-md-none"
              aria-label="open-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="d-md-none mt-3 border-top pt-3">
            <NavLink to="/" className="d-block mb-2" onClick={() => setMenuOpen(false)}>
              {t("HOME")}
            </NavLink>
            <NavLink to="/shop" className="d-block mb-2" onClick={() => setMenuOpen(false)}>
              {t("SHOP")}
            </NavLink>
            <NavLink to="/categories" className="d-block mb-2" onClick={() => setMenuOpen(false)}>
              {t("CATEGORIES")}
            </NavLink>
            <NavLink to="/contact" className="d-block" onClick={() => setMenuOpen(false)}>
              {t("CONTACT")}
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}