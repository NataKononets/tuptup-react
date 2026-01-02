import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import slide1 from "../assets/img/slide1.jpg";
import slide2 from "../assets/img/slide2.jpg";
import slide3 from "../assets/img/slide3.jpg";

const slides = [
  {
    title: "Welcome to TupTup",
    subtitle: "Toys, clothes & essentials for kids",
    image: slide1,
    link: "/shop",
  },
  {
    title: "New Collection",
    subtitle: "Comfort & style for little ones",
    image: slide2,
    link: "/shop",
  },
  {
    title: "Winter Sale",
    subtitle: "Up to 30% off",
    image: slide3,
    link: "/shop",
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <section className="slider">
      <div
        className="slider-slide"
        style={{
          backgroundImage: `url(${slides[current].image})`,
        }}
      >
        <div className="slider-overlay" />

        <div className="slider-content">
          <h1>{slides[current].title}</h1>
          <p>{slides[current].subtitle}</p>
          <button
            className="slider-btn"
            onClick={() => navigate(slides[current].link)}
          >
            Shop Now
          </button>
        </div>

        <button className="slider-arrow left" onClick={prevSlide}>
          <FaChevronLeft />
        </button>

        <button className="slider-arrow right" onClick={nextSlide}>
          <FaChevronRight />
        </button>

        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}