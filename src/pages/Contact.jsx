import { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
  botField: "",
};

export default function Contact() {
  const { t } = useLanguage();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ===== VALIDATORS ===== */

  const isNameValid = (name) =>
    /^[A-Za-zА-Яа-яЁёІіЇїЄє\s]{2,}$/.test(name.trim());

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const isPhoneValid = (phone) =>
    !phone.trim() || /^[0-9+\s()-]{7,15}$/.test(phone.trim());

  const isMessageValid = (msg) => msg.trim().length >= 10;

  function validateField(name, value) {
    switch (name) {
      case "name":
        if (!value.trim()) return t("CONTACT_ERROR_NAME_REQUIRED");
        if (!isNameValid(value)) return t("CONTACT_ERROR_NAME_FORMAT");
        return "";

      case "email":
        if (!value.trim()) return t("CONTACT_ERROR_EMAIL_REQUIRED");
        if (!isEmailValid(value)) return t("CONTACT_ERROR_EMAIL_FORMAT");
        return "";

      case "phone":
        if (!isPhoneValid(value)) return t("CONTACT_ERROR_PHONE_FORMAT");
        return "";

      case "message":
        if (!value.trim()) return t("CONTACT_ERROR_MESSAGE_REQUIRED");
        if (!isMessageValid(value))
          return t("CONTACT_ERROR_MESSAGE_LENGTH");
        return "";

      default:
        return "";
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  }

  function getInputClass(name) {
    if (!touched[name]) return "form-control";
    if (errors[name]) return "form-control is-invalid";
    return "form-control is-valid";
  }

  function isFormValid() {
    return (
      isNameValid(form.name) &&
      isEmailValid(form.email) &&
      isPhoneValid(form.phone) &&
      isMessageValid(form.message)
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.botField) return;

    const newErrors = {
      name: validateField("name", form.name),
      email: validateField("email", form.email),
      phone: validateField("phone", form.phone),
      message: validateField("message", form.message),
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
    });

    if (Object.values(newErrors).some(Boolean)) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">{t("CONTACT_TITLE")}</h2>

      <div className="row g-5 align-items-start">
        {/* INFO */}
        <div className="col-md-5">
          <h5 className="mb-3">{t("CONTACT_GET_IN_TOUCH")}</h5>

          <p>
            <FaMapMarkerAlt className="me-2 text-warning" />
            {t("CONTACT_ADDRESS")}
          </p>
          <p>
            <FaEnvelope className="me-2 text-warning" />
            support@tupup.com
          </p>
          <p>
            <FaPhone className="me-2 text-warning" />
            +48 500 200 300
          </p>

          <h6 className="mt-4">{t("CONTACT_HOURS")}</h6>
          <p>{t("CONTACT_WEEK")}</p>
          <p>{t("CONTACT_WEEKEND")}</p>
        </div>

        {/* FORM */}
        <div className="col-md-7">
          {sent ? (
            <div className="text-center border rounded p-4 bg-light">
              <h5>{t("CONTACT_SUCCESS_TITLE")} 💛</h5>
              <p className="mb-0">
                {t("CONTACT_SUCCESS_TEXT_1")}
                <br />
                {t("CONTACT_SUCCESS_TEXT_2")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* honeypot */}
              <input
                type="text"
                name="botField"
                value={form.botField}
                onChange={handleChange}
                style={{ display: "none" }}
              />

              {/* NAME */}
              <div className="mb-3">
                <label className="form-label">
                  {t("CONTACT_NAME")}
                </label>
                <input
                  type="text"
                  name="name"
                  className={getInputClass("name")}
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t("CONTACT_NAME_PH")}
                />
                {errors.name && (
                  <div className="invalid-feedback">
                    {errors.name}
                  </div>
                )}
              </div>

              {/* EMAIL */}
              <div className="mb-3">
                <label className="form-label">
                  {t("CONTACT_EMAIL")}
                </label>
                <input
                  type="email"
                  name="email"
                  className={getInputClass("email")}
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t("CONTACT_EMAIL_PH")}
                />
                {errors.email && (
                  <div className="invalid-feedback">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* PHONE */}
              <div className="mb-3">
                <label className="form-label">
                  {t("CONTACT_PHONE")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  className={getInputClass("phone")}
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t("CONTACT_PHONE_PH")}
                />
                {errors.phone && (
                  <div className="invalid-feedback">
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* MESSAGE */}
              <div className="mb-4">
                <label className="form-label">
                  {t("CONTACT_MESSAGE")}
                </label>
                <textarea
                  name="message"
                  rows="5"
                  className={getInputClass("message")}
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t("CONTACT_MESSAGE_PH")}
                />
                {errors.message && (
                  <div className="invalid-feedback">
                    {errors.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-dark w-100"
                disabled={!isFormValid() || loading}
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
  );
}