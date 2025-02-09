import React from "react";
import Button from "../ui/Button";
import Link from "next/link";

function Frontpage() {
  return (
    <section className="flex flex-col w-full h-screen bg-mobile sm:bg-video bg-no-repeat bg-cover p-10 lg:p-20 bg-top place-items-center">
      <h1 className="sm:max-w-[40vw] md:max-w-[60vw] 2xl:max-w-[50vw] text-4xl md:text-7xl sm:text-5xl text-center self-center text-white mb-8 mt-32 font-ubuntu font-extrabold">
        Bring your board meetings to the next level!{" "}
      </h1>
      <h2 className="font-semibold text-white/80 mb-20 text-xl md:text-3xl sm:text-2xl self-center">
        Agreeing has never been easier.
      </h2>
      <nav className="flex gap-5">
        <Link
          href="#"
          className="bg-secondary text-white bg-opacity-60 hover:bg-opacity-80 active:scale-95 active:bg-secondary-dark backdrop-blur-md font-bold w-fit py-2 px-6 self-center border-2 border-white rounded-lg"
        >
          See more
        </Link>
        <Link
          href="#"
          className="bg-secondary text-white bg-opacity-60 hover:bg-opacity-80 active:scale-95 active:bg-secondary-dark backdrop-blur-md font-bold w-fit py-2 px-6 self-center border-2 border-white rounded-lg"
        >
          Try BoardSphere
        </Link>
      </nav>
    </section>
  );
}

export default Frontpage;
