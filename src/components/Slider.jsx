import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

import slide1 from "../assets/img/slide1.jpg";
import slide2 from "../assets/img/slide2.jpg";
import slide3 from "../assets/img/slide3.jpg";

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const slides = [
    {
      title: t("SLIDE_1_TITLE"),
      subtitle: t("SLIDE_1_SUBTITLE"),
      image: slide1,
      link: "/shop",
    },
    {
      title: t("SLIDE_2_TITLE"),
      subtitle: t("SLIDE_2_SUBTITLE"),
      image: slide2,
      link: "/shop",
    },
    {
      title: t("SLIDE_3_TITLE"),
      subtitle: t("SLIDE_3_SUBTITLE"),
      image: slide3,
      link: "/shop",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
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
            {t("SLIDER_BTN")}
          </button>
        </div>

        {/* ARROWS */}
        <button
          className="slider-arrow left"
          onClick={prevSlide}
        >
          <FaChevronLeft />
        </button>

        <button
          className="slider-arrow right"
          onClick={nextSlide}
        >
          <FaChevronRight />
        </button>

        {/* DOTS */}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${
                index === current ? "active" : ""
              }`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}