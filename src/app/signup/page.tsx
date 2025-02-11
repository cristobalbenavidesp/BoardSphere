"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";

function page() {
  type SignUpData = {
    name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
  };
  const [signUpData, setSignUpData] = useState<SignUpData>({});
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [passwordConfirmed, setPasswordConfirmed] = useState<boolean | null>(
    null
  );
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSubmitDisabled(!checkFulfilled());
    if (!confirmPasswordRef.current?.focus && signUpData.confirm_password) {
      setPasswordConfirmed(signUpData.password === signUpData.confirm_password);
    }
  }, [signUpData]);

  useEffect(() => {
    if (!confirmPasswordRef.current) return;

    const passwordsMatch = signUpData.password === signUpData.confirm_password;

    if (signUpData.confirm_password) {
      if (passwordsMatch) {
        confirmPasswordRef.current.setCustomValidity("");
      } else {
        confirmPasswordRef.current.setCustomValidity("Passwords do not match");
      }

      confirmPasswordRef.current.reportValidity();
    }
  }, [signUpData.password, signUpData.confirm_password]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  }

  function checkFulfilled() {
    return (
      signUpData.name &&
      signUpData.last_name &&
      signUpData.email &&
      signUpData.password &&
      signUpData.confirm_password
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (checkFulfilled()) {
      console.log("Submitting...");
    }
  }

  return (
    <div className="grid place-items-center w-full h-screen bg-primary">
      <form
        role="form"
        className="rounded-lg shadow-lg bg-white p-8 flex flex-col gap-4 w-sm"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-black">Sign up</h1>
        <label className="flex flex-col text-black">
          Name
          <input
            role="textbox"
            placeholder="Name"
            name="name"
            className="border rounded-lg p-2"
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex flex-col text-black">
          Last name
          <input
            role="textbox"
            placeholder="Last name"
            name="last_name"
            className="border rounded-lg p-2"
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex flex-col text-black">
          Email
          <input
            role="textbox"
            placeholder="Email@example.com"
            type="email"
            name="email"
            className="border rounded-lg p-2"
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col text-black">
          Password
          <input
            role="textbox"
            placeholder="Password"
            name="password"
            type="password"
            className="border rounded-lg p-2"
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex flex-col text-black">
          Confirm password
          <input
            role="textbox"
            placeholder="Confirm password"
            name="confirm_password"
            type="password"
            className="border rounded-lg p-2"
            ref={confirmPasswordRef}
            onChange={handleChange}
            required
          />
        </label>
        <button
          role="button"
          type="submit"
          name="submit"
          className="rounded-lg bg-primary text-white p-2 mt-2"
          disabled={submitDisabled}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default page;
