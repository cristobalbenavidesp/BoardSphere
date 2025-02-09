import Footer from "@/components/footer/Footer.js";
import FrontPage from "@/components/frontpage/Frontpage.js";
import Info from "@/components/info/index.js";
import Link from "next/link.js";
export default function Home() {
  return (
    <article className="relative w-full h-full overflow-hidden bg-gradient-to-br from-blue-950/40  to-blue-900/80 z-10">
      <FrontPage />
      <nav className="absolute flex flex-1 w-full h-fit top-0 py-6 place-content-center gap-5 bg-white/20 backdrop-blur-md">
        <Link
          className="text-2xl text-white font-ubuntu font-bold self-center"
          href="#"
        >
          BoardSphere
        </Link>
        <Link
          className="text-2xl text-white font-ubuntu font-extrabold self-center"
          href="#"
        >
          Pricing
        </Link>
        <Link
          className="text-2xl text-white font-ubuntu font-extrabold self-center"
          href="#"
        >
          About Us
        </Link>
      </nav>
      <Info />
      <Footer />
    </article>
  );
}
