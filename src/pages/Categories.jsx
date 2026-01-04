import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

import toysImg from "../assets/img/toys.jpg";
import clothesImg from "../assets/img/clothes.jpg";
import shoesImg from "../assets/img/shoes.jpg";
import booksImg from "../assets/img/books.jpg";

export default function Categories() {
  const { t } = useLanguage();

  const categories = [
    {
      key: "toys",
      title: t("CATEGORY_TOYS"),
      image: toysImg,
    },
    {
      key: "clothes",
      title: t("CATEGORY_CLOTHES"),
      image: clothesImg,
    },
    {
      key: "shoes",
      title: t("CATEGORY_SHOES"),
      image: shoesImg,
    },
    {
      key: "books",
      title: t("CATEGORY_BOOKS"),
      image: booksImg,
    },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">
        {t("CATEGORIES_TITLE")}
      </h2>

      <div className="row g-4">
        {categories.map((cat) => (
          <div key={cat.key} className="col-6 col-md-4 col-lg-3">
            <Link
              to={`/shop?category=${cat.key}`}
              className="category-card text-decoration-none"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="cat-img"
              />
              <h5 className="cat-title text-center mt-2">
                {cat.title}
              </h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}