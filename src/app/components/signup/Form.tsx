"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type SignUpData = {
  name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
};

function checkFulfilled(signUpData: SignUpData) {
  return (
    signUpData.name &&
    signUpData.last_name &&
    signUpData.email &&
    signUpData.password &&
    signUpData.confirm_password
  );
}

function Form() {
  const [signUpData, setSignUpData] = useState<SignUpData>({});
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSubmitDisabled(!checkFulfilled(signUpData));
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpData),
    });

    if (!response.ok) {
      toast.error("sign up failed");
    }

    toast.success("sign up successful");

    return await response.json();
  }

  return (
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
        Country
        <input
          role="textbox"
          placeholder="Country"
          name="country"
          className="border rounded-lg p-2"
          onChange={handleChange}
          required
        />
      </label>
      <label className="flex flex-col text-black">
        DNI
        <input
          role="textbox"
          placeholder="DNI"
          name="dni"
          className="border rounded-lg p-2"
          onChange={handleChange}
          required
        />
      </label>
      <label className="flex flex-col text-black">
        Email
        <input
          role="textbox"
          placeholder="email@example.com"
          type="email"
          name="email"
          className="border rounded-lg p-2"
          onChange={handleChange}
          required
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
        className="rounded-lg bg-primary text-white p-2 mt-2 disabled:bg-gray-400"
        disabled={submitDisabled}
      >
        Submit
      </button>
    </form>
  );
}

export default Form;
