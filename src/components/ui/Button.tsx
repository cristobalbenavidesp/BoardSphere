"use-client";
import React, { MouseEvent, MouseEventHandler } from "react";

function Button({
  children,
  className,
  method,
  type,
}: {
  children: React.ReactNode;
  className?: string;
  method?: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      type={type ?? "button"}
      className={`rounded-xl py-2 px-3 w-fit shadow-sm  active:scale-95 ${className}`}
      onClick={method}
    >
      {children}
    </button>
  );
}

export default Button;
