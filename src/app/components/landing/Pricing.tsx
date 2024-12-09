import { BsCheck2Circle as CheckIcon } from "react-icons/bs";

function Pricing() {
  return (
    <div className="grid grid-cols-3 grid-rows-[auto auto] gap-y-10">
      <div className="pricing-title col-span-3 flex items-center px-52">
        <h2 className="text-black text-5xl font-bold">Precios</h2>
        <p className="ml-52 text-black">
          Saca el máximo potencial a nuestra plataforma con nuestros planes de
          suscripción, que añaden más herramientas y personalización a nuestra
          capa gratuita.
        </p>
      </div>
      <div className="pricing-card place-self-start">
        <h3 className="text-2xl font-bold text-primary">BÁSICO</h3>
        <strong className="text-5xl font-bold text-black">GRATIS</strong>
        <ul className="text-black flex flex-col gap-3">
          <li>
            <CheckIcon className="inline-block text-primary mr-5" />
            <span>Crear proyectos básicos</span>
          </li>
          <li>
            <CheckIcon className="inline-block text-primary mr-5" />
            <span>Visualizar reporte de datos básico</span>
          </li>
          <li>
            <CheckIcon className="inline-block text-primary mr-5" />
            <span>Máximo 100 usuarios por proyecto</span>
          </li>
        </ul>
      </div>
      <div className="pricing-card place-self-center">
        <h3 className="text-2xl font-bold text-primary">PRO</h3>
        <strong className="text-5xl font-bold text-black">
          $100/<span className="text-2xl">mes</span>
        </strong>
        <ul className="text-black flex flex-col gap-3">
          <li>
            <CheckIcon className="inline-block text-primary mr-5" />
            <span>Crear proyectos personalizados</span>
          </li>
          <li>
            <CheckIcon className="inline-block text-primary mr-5" />
            <span>Utilizar plantillas y herramientas</span>
          </li>
          <li>
            <CheckIcon className="inline-block text-primary mr-5" />
            <span>Visualizar reporte avanzado</span>
          </li>
          <li>
            <CheckIcon className="inline-block text-primary mr-5" />
            <span>Máximo 1000 usuarios por proyecto</span>
          </li>
        </ul>
      </div>
      <div className="pricing-card place-self-end">
        <h3 className="text-2xl font-bold text-primary">ENTERPRISE</h3>
        <strong className="text-5xl font-bold text-black">CUSTOM</strong>
        <ul className="text-black flex flex-col gap-3">
          <li>
            <CheckIcon className="inline-block text-primary mr-5" />
            <span>Crear proyectos personalizados</span>
          </li>
          <li>
            <CheckIcon className="inline-block text-primary mr-5" />
            <span>Utilizar plantillas y herramientas</span>
          </li>
          <li>
            <CheckIcon className="inline-block text-primary mr-5" />
            <span>Visualizar reporte integrado</span>
          </li>
          <li>
            <CheckIcon className="inline-block text-primary mr-5" />
            <span>Sin límite de usuarios</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Pricing;
