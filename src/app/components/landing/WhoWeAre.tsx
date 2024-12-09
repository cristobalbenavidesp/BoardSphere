function WhoWeAre() {
  return (
    <article className="w-full flex items-center">
      <div className="who-we-are-card bg-white px-10 pt-20 text-black">
        <h1 className="text-5xl font-bold">¿Quienes Somos?</h1>
        <p className="text-l mt-10">
          <b>BoardSphere</b> es un emprendimiento dirigido a prevenir el
          problema de la desalineación de intereses en el ámbito grupal u
          organizacional a través de herramientas que faciliten lograr consensos
          de manera más eficiente y proveer información relevante de las
          interacciónes entre los miembros para una mejor toma de decisiones.
        </p>
        <p className="text-lg mt-5">
          Nuestra <b>misión</b> es agilizar la creación cooperativa de planes,
          diseños y documentos articulados como actas y licencias. Nos
          comprometemos a entregar reportes claros y detallados que potencien la
          toma de decisiones y mejoren la productividad en entornos
          empresariales y organizativos.
        </p>
        <p className="text-lg mt-5">
          Nuestra <b>visión</b> es convertir BoardSphere en un estándar en la
          creacion de planes, diseños y documentos articulados a nivel mundial.
        </p>
      </div>
      <div className="who-we-are-card-2 -ml-10 -z-10 pl-20 pt-20">
        <h1 className="text-5xl font-bold">Valores</h1>
        <ul className="text-lg mt-10">
          <li>Transparencia</li>
          <li>Colaboración</li>
          <li>Confianza</li>
          <li>Respeto</li>
          <li>Responsabilidad</li>
        </ul>
      </div>
    </article>
  );
}

export default WhoWeAre;
