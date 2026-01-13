import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

let mockUser = null;


// Cart
vi.mock("../context/CartContext", () => ({
  useCart: () => ({
    totalCount: 2,
  }),
}));

// Search
vi.mock("../context/SearchContext", () => ({
  useSearch: () => ({
    searchQuery: "",
    setSearchQuery: vi.fn(),
  }),
}));

// Products
vi.mock("../hooks/useProducts", () => ({
  useProducts: () => ({
    products: [],
  }),
}));

// Debounce
vi.mock("../hooks/useDebounce", () => ({
  useDebounce: (v) => v,
}));

// Language
vi.mock("../context/LanguageContext", () => ({
  useLanguage: () => ({
    t: (key) => key,
  }),
}));

// 🔑 Auth — ОДИН мок, управляем user вручную
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: mockUser,
    logout: vi.fn(),
  }),
}));


import Header from "../components/Header";


function renderHeader() {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}

describe("Header — guest user", () => {
  beforeEach(() => {
    mockUser = null;
  });

  it("renders logo and navigation", () => {
    renderHeader();

    expect(screen.getByText("TupTup")).toBeInTheDocument();
    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("SHOP")).toBeInTheDocument();
  });

  it("shows LOGIN button", () => {
    renderHeader();

    expect(screen.getByText("LOGIN")).toBeInTheDocument();
  });

  it("shows cart counter", () => {
    renderHeader();

    expect(screen.getByText("2")).toBeInTheDocument();
  });
});

describe("Header — authenticated user", () => {
  beforeEach(() => {
    mockUser = { email: "test@test.com" };
  });

  it("shows user email instead of LOGIN", () => {
    renderHeader();

    expect(screen.getByText("test@test.com")).toBeInTheDocument();
  });
});