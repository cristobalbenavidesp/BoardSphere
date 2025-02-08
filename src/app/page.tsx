import ResumeCard from "./components/ui/ResumeCard";
import WhoWeAre from "./components/landing/WhoWeAre";
import Team from "./components/landing/Team";
import Features from "./components/landing/Features";
import Pricing from "./components/landing/Pricing";

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-full min-h-screen font-ubuntu">
      <header className="w-full self-start flex px-8 p-5 justify-between shadow-md absolute bg-primary">
        <h1 className="text-3xl font-bold text-white">BoardSphere</h1>
        <nav className="flex items-center justify-center gap-x-8 self-en text-white">
          <a href="#who-we-are" className="text-lg font-medium">
            ¿Quienes somos?
          </a>
          <a href="#features" className="text-lg font-medium">
            Features
          </a>
          <a href="#team" className="text-lg font-medium">
            Equipo
          </a>
          <a href="#contact" className="text-lg font-medium">
            Contacto
          </a>
        </nav>
      </header>
      <div className="w-full p-5 px-8 md:px-14 xl:px-40 flex flex-col pb-40">
        <div className="w-full h-screen mt-[18rem]">
          <strong className="text-black md:text-5xl text-start text-pretty w-[683px] drop-shadow-lg">
            Crea planes y diseños como nunca antes
          </strong>
          <div className="w-full h-fit flex gap-16 justify-between mt-[126px]">
            <ResumeCard>
              <h1 className="font-bold text-3xl">¿Quienes somos?</h1>
              <p className="">
                Nuestra misión es agilizar la creación cooperativa de planes,
                diseños y documentos articulados como actas y licencias. Nos
                comprometemos a entregar reportes claros y detallados que
                potencien la toma de decisiones y mejoren la productividad en
                entornos empresariales y organizativos.
              </p>
              <p className="">
                Haciendo click en “Ver más” podrás conocer el estado actual de
                nuestro proyecto, así como nuestra visión y valores.
              </p>
            </ResumeCard>
            <ResumeCard>
              <h1 className="font-bold text-3xl">Nuestra plataforma</h1>
              <p className="">
                Descubre cómo puedes mejorar la eficacia y eficiencia de tu
                organización creando planes y diseños con nuestro enfoque
                cooperativo.
              </p>
              <p className="">
                Adapta el proceso a tus necesidades o utiliza plantillas
                personalizadas que se adaptan a los distintos casos de uso.
              </p>
            </ResumeCard>
            <ResumeCard>
              <h1 className="font-bold text-3xl">Precios</h1>
              <p className="">
                Saca el máximo potencial a nuestra plataforma con nuestros
                planes de suscripción, que añaden más herramientas y
                personalización a nuestra capa gratuita.
              </p>
            </ResumeCard>
          </div>
        </div>
        <div className="h-screen grid items-center">
          <WhoWeAre />
        </div>
        <div className="h-screen grid items-center">
          <Team />
        </div>
        <div className="h-screen grid items-center">
          <Features />
        </div>
        <div className="h-screen grid items-center">
          <Pricing />
        </div>
      </div>
      <footer className="w-full h-40 bg-primary flex items-center justify-center text-white">
        Gracias por visitar BoardSphere
      </footer>
    </div>
  );
}
