import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  /* ============================
     HELPERS
  ============================ */

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const generateOrderNumber = () => {
    return `TUP-${Date.now().toString().slice(-6)}`;
  };

  /* ============================
     HANDLERS
  ============================ */

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ограничения
    if (name === "name" && value.length > 40) return;
    if (name === "email" && value.length > 50) return;
    if (name === "address" && value.length > 80) return;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      alert("Please fill in all fields");
      return;
    }

    if (!isEmailValid(form.email)) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setOrderNumber(generateOrderNumber());
      clearCart();
    }, 2000);
  };

  /* ============================
     EMPTY CART
  ============================ */
  if (cart.length === 0 && !success) {
    return (
      <div className="container py-5 text-center">
        <h2>Your cart is empty 🛒</h2>
      </div>
    );
  }

  /* ============================
     SUCCESS SCREEN
  ============================ */
  if (success) {
    return (
      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-3">Thank you for your purchase! 🎉</h2>

        <p className="fs-5">
          Your order has been <strong>successfully placed and paid</strong>.
        </p>

        <p className="text-muted">
          Order number: <strong>{orderNumber}</strong>
        </p>

        <div className="mt-4">
          <span className="badge bg-success fs-6 px-4 py-2">
            Payment confirmed
          </span>
        </div>

        <p className="text-muted mt-4">
          Our administrator will contact you shortly to confirm the details.
        </p>
      </div>
    );
  }

  /* ============================
     CHECKOUT FORM
  ============================ */
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Checkout</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">

          <form onSubmit={handleSubmit} className="border p-4 rounded">

            {/* NAME */}
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            {/* EMAIL */}
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                placeholder="john@email.com"
                required
              />
              <div className="form-text">
                We’ll never share your email with anyone else.
              </div>
            </div>

            {/* ADDRESS */}
            <div className="mb-3">
              <label className="form-label">Delivery Address</label>
              <textarea
                name="address"
className="form-control"
                rows="3"
                value={form.address}
                onChange={handleChange}
                placeholder="Street, city, postal code"
                required
              />
            </div>

            {/* TOTAL */}
            <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="btn btn-success w-100 py-2"
              disabled={loading}
            >
              {loading ? "Processing payment…" : "Pay now"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}