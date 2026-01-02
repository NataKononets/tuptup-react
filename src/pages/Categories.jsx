import { Link } from "react-router-dom";
import toysImg from "../assets/img/toys.jpg";
import clothesImg from "../assets/img/clothes.jpg";
import shoesImg from "../assets/img/shoes.jpg";
import booksImg from "../assets/img/books.jpg";

const categories = [
  {
    key: "toys",
    title: "Toys",
    image: toysImg,
  },
  {
    key: "clothes",
    title: "Clothes",
    image: clothesImg,
  },
  {
    key: "shoes",
    title: "Shoes",
    image: shoesImg,
  },
  {
    key: "books",
    title: "Books",
    image: booksImg,
  },
];

export default function Categories() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Categories</h2>

      <div className="row g-4">
        {categories.map(cat => (
          <div key={cat.key} className="col-6 col-md-4 col-lg-3">
            <Link
              to={`/shop?category=${cat.key}`}
              className="category-card"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="cat-img"
              />
              <h5 className="cat-title">{cat.title}</h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}