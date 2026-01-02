import { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // honeypot (анти-бот)
  const [botField, setBotField] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // 🛑 если бот заполнил скрытое поле — ничего не делаем
    if (botField) return;

    setLoading(true);

    // имитация отправки
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  }

  return (
    <div className="container py-5">
      <h2 className="contact-title text-center mb-5">Contact Us</h2>

      <div className="row g-5 align-items-start">
        {/* LEFT INFO */}
        <div className="col-md-5">
          <div className="contact-info">
            <h5 className="contact-subtitle">Get in touch</h5>

            <p className="contact-text">
              <FaMapMarkerAlt className="me-2 text-warning" />
              Warsaw, Poland
            </p>

            <p className="contact-text">
              <FaEnvelope className="me-2 text-warning" />
              support@tupup.com
            </p>

            <p className="contact-text">
              <FaPhone className="me-2 text-warning" />
              +48 500 200 300
            </p>

            <h6 className="contact-subtitle mt-4">Working hours</h6>
            <p className="contact-text">Mon – Fri: 9:00 – 18:00</p>
            <p className="contact-text">Sat – Sun: Closed</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="col-md-7">
          <div className="contact-form">
            {sent ? (
              <div className="contact-success text-center">
                <h5>Thank you! 💛</h5>
                <p>
                  Your message has been sent.<br />
                  Our team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* HONEYPOT (СКРЫТО) */}
                <input
                  type="text"
                  style={{ display: "none" }}
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                />

                {/* NAME */}
                <div className="mb-3">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    minLength={2}
                    maxLength={50}
                    placeholder="John Doe"
                  />
                </div>

                {/* EMAIL */}
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    maxLength={100}
                    pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
                    placeholder="email@example.com"
                  />
                </div>

                {/* PHONE */}
                <div className="mb-3">
                  <label className="form-label">Phone (optional)</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="+48 500 200 300"
                    pattern="^[0-9+\s()-]{7,15}$"
                    maxLength={15}
                  />
                </div>

                {/* MESSAGE */}
                <div className="mb-4">
                  <label className="form-label">Message</label>
                  <textarea
                    rows="5"
                    className="form-control"
                    required
                    minLength={10}
                    maxLength={500}
                    placeholder="Write your message here..."
                  />
                </div>

                <button
type="submit"
                  className="contact-btn"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}