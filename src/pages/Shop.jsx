import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

export default function Shop() {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const { searchQuery } = useSearch();
  const { t } = useLanguage();

  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [visibleCount, setVisibleCount] = useState(4);

  if (loading) {
    return <p className="text-center py-5">{t("LOADING")}</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  let filtered = products.filter((p) =>
    `${p.title} ${p.description} ${p.category}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  if (activeCategory !== "all") {
    filtered = filtered.filter((p) => p.category === activeCategory);
  }


  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sort === "title-asc") filtered.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "title-desc") filtered.sort((a, b) => b.title.localeCompare(a.title));

  const categories = ["all", ...new Set(products.map((p) => p.category))];
  const visibleProducts = filtered.slice(0, visibleCount);

  return (
    <section className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">{t("SHOP")}</h2>
        <p className="text-muted">{t("SHOP_DESC")}</p>
      </div>

      <div className="d-flex flex-column gap-4 mb-4">
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn ${
                activeCategory === cat ? "btn-dark" : "btn-outline-dark"
              }`}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(4);
              }}
            >
              {cat === "all" ? t("ALL") : cat}
            </button>
          ))}
        </div>

        <div className="text-center">
          <select
            className="form-select w-auto mx-auto"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">{t("SORT_BY")}</option>
            <option value="price-asc">{t("PRICE_ASC")}</option>
            <option value="price-desc">{t("PRICE_DESC")}</option>
            <option value="title-asc">{t("NAME_ASC")}</option>
            <option value="title-desc">{t("NAME_DESC")}</option>
          </select>
        </div>
      </div>

      {visibleProducts.length === 0 && (
        <p className="text-center text-muted fs-5">
          {t("NOTHING_FOUND")}
        </p>
      )}

      <div className="row g-4">
        {visibleProducts.map((product) => (
          <div key={product.id} className="col-6 col-md-4 col-lg-3">
            <div className="product-card h-100 d-flex flex-column">
              <Link
                to={`/product/${product.id}`}
                className="text-decoration-none text-dark"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="mb-3 img-fluid"
                />
                <h5 className="flex-grow-1">{product.title}</h5>
              </Link>

              <p className="fw-semibold mb-3">
                ${product.price}
              </p>

              <button
                className="btn tup-btn w-100 mt-auto"
                onClick={() => addToCart(product)}
              >
                {t("ADD_TO_CART")}
              </button>
            </div>
            </div>
        ))}
      </div>

      {visibleCount < filtered.length && (
        <div className="text-center mt-5">
          <button
            className="btn btn-outline-dark px-5 py-2"
            onClick={() => setVisibleCount((prev) => prev + 4)}
          >
            {t("LOAD_MORE")}
          </button>
        </div>
      )}
    </section>
  );
}