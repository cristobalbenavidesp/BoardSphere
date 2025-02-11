import SignUpPage from "../app/signup/page";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { Toaster } from "react-hot-toast";
import { describe, it, afterEach, expect, vi } from "vitest";

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
  it("should have country input and label", () => {
    render(<SignUpPage />);
    screen.getByLabelText("Country");
    screen.getByRole("textbox", { name: "Country" });
  });
  it("should have DNI input and label", () => {
    render(<SignUpPage />);
    screen.getByLabelText("DNI");
    screen.getByRole("textbox", { name: "DNI" });
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

    fireEvent.blur(confirmPasswordInput);

    await new Promise((r) => setTimeout(r, 0));

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

    expect(confirmPasswordInput.validity.valid).toBe(true);
  });
});

describe("Sign up page API integration", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it("should call the API and show a success toast on successful sign up", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ message: "Success" }),
        })
      )
    );

    render(
      <>
        <SignUpPage />
        <Toaster />
      </>
    );

    fireEvent.change(screen.getByRole("textbox", { name: "Name" }), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Last name" }), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Country" }), {
      target: { value: "USA" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "DNI" }), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Email" }), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Password" }), {
      target: { value: "password123" },
    });
    fireEvent.change(
      screen.getByRole("textbox", { name: "Confirm password" }),
      { target: { value: "password123" } }
    );

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/signup",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "John",
          last_name: "Doe",
          country: "USA",
          dni: "12345678",
          email: "john@example.com",
          password: "password123",
          confirm_password: "password123",
        }),
      })
    );

    await screen.findByText(/sign up successful/i);
  });

  it("should show an error toast if API call fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ message: "Error" }),
        })
      )
    );

    render(
      <>
        <SignUpPage />
        <Toaster />
      </>
    );

    // Completar todos los campos
    fireEvent.change(screen.getByRole("textbox", { name: "Name" }), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Last name" }), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Country" }), {
      target: { value: "USA" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "DNI" }), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Email" }), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Password" }), {
      target: { value: "password123" },
    });
    fireEvent.change(
      screen.getByRole("textbox", { name: "Confirm password" }),
      { target: { value: "password123" } }
    );

    // Enviar el formulario
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Verificar que el toast de error aparece
    expect(await screen.findByText(/sign up failed/i));
  });
});
