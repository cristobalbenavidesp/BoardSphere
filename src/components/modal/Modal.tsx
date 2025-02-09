"use client";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

function Modal({
  showModal,
  children,
}: {
  showModal: boolean;
  children: ReactNode[] | ReactNode | string | number | null | undefined;
}) {
  return showModal && typeof window !== "undefined"
    ? createPortal(
        <div className="z-50 w-full h-full min-h-screen absolute top-0 left-0 grid place-items-center bg-neutral-700/30">
          {children}
        </div>,
        document.querySelector("#portal") as Element
      )
    : null;
}

export default Modal;
