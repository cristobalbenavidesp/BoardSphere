import React from "react";
import Form from "../form/Form";
import { SiGmail, SiInstagram, SiFacebook } from "react-icons/si";

function Footer() {
  return (
    <div className="w-full h-[60vh] lg:h-[30rem] p-4 flex place-content-center bg-end-mobile md:bg-end bg-cover bg-bottom relative">
      <footer className="md:flex items-center md:justify-between w-fit h-full gap-20">
        <Form styles="absolute top-43 mx-auto" />
        <section className="flex absolute bottom-8 justify-evenly w-full left-0">
          <address className="flex gap-3 font-semibold text-lg text-white">
            <SiFacebook className="text-[#3a61ff] scale-150 aspect-square w-fit h-fit" />
            Facebook
          </address>
          <address className="flex gap-3 font-semibold text-lg text-white">
            <SiInstagram className="text-[#FF89EE] scale-150 aspect-square w-fit h-fit" />
            Instagram
          </address>
          <address className="flex gap-3 font-semibold text-lg text-white">
            <SiGmail className="text-[#c80e0e] scale-150 aspect-square w-fit h-fit" />
            Gmail
          </address>
        </section>
      </footer>
    </div>
  );
}

export default Footer;
