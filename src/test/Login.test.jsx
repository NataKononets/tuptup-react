import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";

vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    login: vi.fn(),
    loginWithGoogle: vi.fn(),
  }),
}));

vi.mock("../context/LanguageContext", () => ({
  useLanguage: () => ({
    t: (key) => key, 
  }),
}));

describe("Login page", () => {
  it("renders login form elements", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Заголовок
    expect(screen.getByText("LOGIN_TITLE")).toBeInTheDocument();

    // Поля
    expect(screen.getByLabelText("LOGIN_EMAIL")).toBeInTheDocument();
    expect(screen.getByLabelText("LOGIN_PASSWORD")).toBeInTheDocument();

    // Кнопки
    expect(screen.getByText("LOGIN_BTN")).toBeInTheDocument();
    expect(screen.getByText("LOGIN_GOOGLE")).toBeInTheDocument();
  });
});