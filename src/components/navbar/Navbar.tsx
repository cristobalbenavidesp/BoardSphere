"use client";
import React, { useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import { CgChevronDown, CgAlbum } from "react-icons/cg";
import Link from "next/link";
import { useSession } from "@/hooks/useSession";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { session } = useSession();
  return (
    <header
      className={`bg-blue-900 px-0 pt-8 z-50 min-h-screen h-full absolute transition-transform duration-300 ${
        open ? "w-72" : "w-20"
      }`}
    >
      <h1
        className={`font-extrabold text-white text-2xl font-ubuntu mb-3 duration-300 transition-transform ${
          !open ? "text-center text-3xl" : "ml-3"
        }`}
      >
        {open ? "BoardSphere" : "BS"}
      </h1>
      <button
        className={`z-50 grid place-items-center absolute -right-3 top-9 w-7 h-7 border-blue-900 border-2 bg-white rounded-full cursor-pointer ${
          open ? "-rotate-90" : "rotate-90"
        } transition-transform duration-300`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <CgChevronDown className="w-full h-full stroke-1" />
      </button>
      <nav className="text-white bg-gradient-to-r from-blue-900 to-blue-950/80">
        <Link
          href="/"
          className={`flex place-items-center text-lg py-2 hover:bg-slate-100/10 hover:text-slate-50 px-2 gap-5 rounded-lg ${
            open ? "place-content-start" : "place-content-center"
          }`}
        >
          <BiHomeAlt className="aspect-square w-7 object-fill scale-125" />
          <span className={!open ? "hidden" : undefined}>Home</span>
        </Link>

        <Link
          href={session ? "/projects" : "/login"}
          className={`flex place-items-center text-lg py-2 hover:bg-slate-100/10 hover:text-slate-50 px-2 gap-5 rounded-lg ${
            open ? "place-content-start" : "place-content-center"
          }`}
        >
          <CgAlbum className="aspect-square w-7 object-fill scale-125" />
          <span className={!open ? "hidden" : undefined}>Projects</span>
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
