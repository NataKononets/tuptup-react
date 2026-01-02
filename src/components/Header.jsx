import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaTimes,
  FaShoppingCart,
  FaBars,
} from "react-icons/fa";

import logo from "../assets/img/logo.png";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { useProducts } from "../hooks/useProducts";
import { useDebounce } from "../hooks/useDebounce";

export default function Header() {
  const { totalCount } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();
  const { products } = useProducts();

  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const debouncedQuery = useDebounce(searchQuery);

  const suggestions =
    debouncedQuery.length > 0
      ? products
          .filter(p =>
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

          {/* LOGO */}
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <img src={logo} alt="TupTup" height="40" />
            <span className="fs-4 fw-bold text-dark">TupTup</span>
          </Link>

          {/* NAV */}
          <nav className="d-none d-md-flex gap-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/categories">Categories</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          {/* ACTIONS */}
          <div className="d-flex align-items-center gap-3 position-relative">

            {/* SEARCH */}
            {!searchOpen ? (
              <button className="btn fs-5" onClick={() => setSearchOpen(true)}>
                <FaSearch />
              </button>
            ) : (
              <div className="position-relative">
                <div className="d-flex align-items-center border rounded-pill px-3">
                  <FaSearch className="me-2 text-muted" />
                  <input
                    className="form-control border-0 shadow-none"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      navigate("/shop");
                    }}
                    onKeyDown={handleEnter}
                    autoFocus
                  />
                  <button
                    className="btn p-0 ms-2"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchOpen(false);
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* SUGGESTIONS */}
                {suggestions.length > 0 && (
                  <div className="position-absolute bg-white border rounded shadow mt-2 w-100 z-3">
                    {suggestions.map(item => (
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

            {/* CART */}
            <Link to="/cart" className="position-relative text-dark">
              <FaShoppingCart />
              {totalCount > 0 && (
<span className="badge bg-danger position-absolute top-0 start-100">
                  {totalCount}
                </span>
              )}
            </Link>

            {/* BURGER */}
            <button className="btn fs-4 d-md-none" onClick={() => setMenuOpen(!menuOpen)}>
              <FaBars />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="d-md-none mt-3 border-top pt-3">
            <NavLink to="/" className="d-block mb-2" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/shop" className="d-block mb-2" onClick={() => setMenuOpen(false)}>Shop</NavLink>
            <NavLink to="/categories" className="d-block mb-2" onClick={() => setMenuOpen(false)}>Categories</NavLink>
            <NavLink to="/contact" className="d-block" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          </div>
        )}
      </div>
    </header>
  );
}