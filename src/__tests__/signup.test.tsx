import SignUpPage from "../app/signup/page";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, it, afterEach, expect } from "vitest";

describe("Sign up page", () => {
  afterEach(cleanup);
  it("should render the sign up page", () => {
    render(<SignUpPage />);
  });
  it("should have the sign up form", () => {
    render(<SignUpPage />);
    screen.getByRole("form");
  });
  it("should have name input and label", () => {
    render(<SignUpPage />);
    screen.getByLabelText("Name");
    screen.getByRole("textbox", { name: "Name" });
  });
  it("should have lastName input and label", () => {
    render(<SignUpPage />);
    screen.getByLabelText("Last name");
    screen.getByRole("textbox", { name: "Last name" });
  });
  it("should have email input and label", () => {
    render(<SignUpPage />);
    screen.getByLabelText("Email");
    screen.getByRole("textbox", { name: "Email" });
  });
  it("should have password input and label", () => {
    render(<SignUpPage />);
    screen.getByLabelText("Password");
    screen.getByRole("textbox", { name: "Password" });
  });
  it("should have confirm password input and label", () => {
    render(<SignUpPage />);
    screen.getByLabelText("Confirm password");
    screen.getByRole("textbox", { name: "Confirm password" });
  });
  it("should have a submit button", () => {
    render(<SignUpPage />);
    screen.getByRole("button", { name: "Submit" });
  });
  it("submit should be disabled when text fields are empty", () => {
    render(<SignUpPage />);
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toHaveProperty("disabled", true);
  });
  it("submit should be enabled when all text fields are filled", () => {
    render(<SignUpPage />);
    const nameInput = screen.getByRole("textbox", { name: "Name" });
    const lastNameInput = screen.getByRole("textbox", { name: "Last name" });
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const passwordInput = screen.getByRole("textbox", { name: "Password" });
    const confirmPasswordInput = screen.getByRole("textbox", {
      name: "Confirm password",
    });
    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.change(nameInput, { target: { value: "John" } });
    expect(submitButton).toHaveProperty("disabled", true);
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    expect(submitButton).toHaveProperty("disabled", true);
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    expect(submitButton).toHaveProperty("disabled", true);
    fireEvent.change(passwordInput, { target: { value: "password" } });
    expect(submitButton).toHaveProperty("disabled", true);
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });
    expect(submitButton).toHaveProperty("disabled", false);
  });
  it("should prevent form submission if email format is invalid", () => {
    render(<SignUpPage />);

    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    }) as HTMLInputElement;
    const submitButton = screen.getByRole("button", {
      name: /submit/i,
    }) as HTMLButtonElement;

    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.click(submitButton);

    expect(emailInput.validity.valid).toBe(false);
  });

  it("should allow form submission if email format is valid", () => {
    render(<SignUpPage />);

    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    }) as HTMLInputElement;
    const submitButton = screen.getByRole("button", {
      name: /submit/i,
    }) as HTMLButtonElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    expect(emailInput.validity.valid).toBe(true);
  });

  it("should prevent form submission if passwords do not match", async () => {
    render(<SignUpPage />);

    const passwordInput = screen.getByRole("textbox", {
      name: "Password",
    }) as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(
      /confirm password/i
    ) as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password321" },
    });
    fireEvent.click(submitButton);

    // Forzar blur para activar la validación personalizada
    fireEvent.blur(confirmPasswordInput);

    // Esperar a que React procese los efectos
    await new Promise((r) => setTimeout(r, 0));

    // Verificar que el campo 'confirm password' está marcado como inválido
    expect(confirmPasswordInput.validity.valid).toBe(false);
    expect(confirmPasswordInput.validationMessage).toBe(
      "Passwords do not match"
    );
  });

  it("should allow form submission if passwords match", () => {
    render(<SignUpPage />);

    const passwordInput = screen.getByRole("textbox", {
      name: "Password",
    }) as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(
      /confirm password/i
    ) as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.click(submitButton);

    // Verificar que el campo 'confirm password' es válido
    expect(confirmPasswordInput.validity.valid).toBe(true);
  });
});
