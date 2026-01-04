import Slider from "../components/Slider";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Slider />

      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4">
          {t("FEATURED_PRODUCTS")}
        </h2>

        <div className="row g-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="col-6 col-md-4 col-lg-3"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}