import { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [botField, setBotField] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (botField) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  }

  return (
    <div className="container py-5">
      <h2 className="contact-title text-center mb-5">
        {t("CONTACT_TITLE")}
      </h2>

      <div className="row g-5 align-items-start">

        <div className="col-md-5">
          <div className="contact-info">
            <h5 className="contact-subtitle">
              {t("CONTACT_GET_IN_TOUCH")}
            </h5>

            <p className="contact-text">
              <FaMapMarkerAlt className="me-2 text-warning" />
              {t("CONTACT_ADDRESS")}
            </p>

            <p className="contact-text">
              <FaEnvelope className="me-2 text-warning" />
              support@tupup.com
            </p>

            <p className="contact-text">
              <FaPhone className="me-2 text-warning" />
              +48 500 200 300
            </p>

            <h6 className="contact-subtitle mt-4">
              {t("CONTACT_HOURS")}
            </h6>
            <p className="contact-text">{t("CONTACT_WEEK")}</p>
            <p className="contact-text">{t("CONTACT_WEEKEND")}</p>
          </div>
        </div>

        <div className="col-md-7">
          <div className="contact-form">
            {sent ? (
              <div className="contact-success text-center">
                <h5>{t("CONTACT_SUCCESS_TITLE")} 💛</h5>
                <p>
                  {t("CONTACT_SUCCESS_TEXT_1")}<br />
                  {t("CONTACT_SUCCESS_TEXT_2")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
          
                <input
                  type="text"
                  style={{ display: "none" }}
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                />

                <div className="mb-3">
                  <label className="form-label">
                    {t("CONTACT_NAME")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    minLength={2}
                    maxLength={50}
                    placeholder={t("CONTACT_NAME_PH")}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    {t("CONTACT_EMAIL")}
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    maxLength={100}
                    pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
                    placeholder={t("CONTACT_EMAIL_PH")}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    {t("CONTACT_PHONE")}
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder={t("CONTACT_PHONE_PH")}
                    pattern="^[0-9+\s()-]{7,15}$"
                    maxLength={15}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    {t("CONTACT_MESSAGE")}
                  </label>
                  <textarea
                    rows="5"
                    className="form-control"
                    required
                    minLength={10}
                    maxLength={500}
                    placeholder={t("CONTACT_MESSAGE_PH")}
                  />
                </div>

                <button
                  type="submit"
                  className="contact-btn"
                  disabled={loading}
                >
                  {loading
                    ? t("CONTACT_SENDING")
                    : t("CONTACT_SEND")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}