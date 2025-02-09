import { it, describe, afterEach } from "vitest";
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
    screen.getByRole("link", { name: "Sign up" });
  });
});
