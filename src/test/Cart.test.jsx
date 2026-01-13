import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Cart from "../pages/Cart";
// CartContext
const mockCart = [
  {
    id: 1,
    title: "Test Product",
    price: 10,
    qty: 2,
    thumbnail: "test.jpg",
  },
];

vi.mock("../context/CartContext", () => ({
  useCart: () => ({
    cart: mockCart,
    totalCount: 2,
    totalPrice: 20,
    addToCart: vi.fn(),
    decreaseQty: vi.fn(),
    removeFromCart: vi.fn(),
  }),
}));

// LanguageContext
vi.mock("../context/LanguageContext", () => ({
  useLanguage: () => ({
    t: (key) => key, 
  }),
}));

function renderCart() {
  render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  );
}

describe("Cart page", () => {
  beforeEach(() => {
    renderCart();
  });

  it("renders cart title", () => {
    expect(screen.getByText("CART_TITLE")).toBeInTheDocument();
  });

  it("renders cart item title", () => {
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("renders checkout link when cart is not empty", () => {
    const checkoutLink = screen.getByRole("link", {
      name: "CART_CHECKOUT",
    });

    expect(checkoutLink).toBeInTheDocument();
    expect(checkoutLink).toHaveAttribute("href", "/checkout");
  });
});
