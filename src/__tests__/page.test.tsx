import { it, describe, afterEach, expect } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Page from "../app/page";

describe("Page", () => {
  afterEach(cleanup);

  it("should render", (): void => {
    render(<Page />);
  });

  it("should have the strong", (): void => {
    render(<Page />);
    screen.getByText("Crea planes y diseños como nunca antes");
  });

  it("should have the business name", () => {
    render(<Page />);
    screen.getAllByText("BoardSphere");
  });

  it("should have the first card", () => {
    render(<Page />);
    screen.getAllByText("¿Quienes somos?");
  });
  it("should show sign up button", () => {
    render(<Page />);
    const sign_up = screen.getByRole("link", { name: "Sign up" });
    expect(sign_up).toBeInstanceOf(HTMLAnchorElement);
  });
  it("should show login button", () => {
    render(<Page />);
    const login = screen.getByRole("link", { name: "Login" });
    expect(login).toBeInstanceOf(HTMLAnchorElement);
  });
  it("should redirect to sign up page", () => {
    render(<Page />);
    const sign_up = screen.getByRole("link", { name: "Sign up" });
    sign_up.click();
    expect(window.location.pathname).toBe("/signup");
  });
  it("should redirect to login page", () => {
    render(<Page />);
    const login = screen.getByRole("link", { name: "Login" });
    login.click();
    expect(window.location.pathname).toBe("/login");
  });
});
