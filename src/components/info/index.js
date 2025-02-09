"use server";
import Article from "@/components/ui/Article";
import P from "@/components/ui/P";

function Info() {
  return (
    <article className="w-full p-10 flex flex-col items-center">
      <section className="text-white/80 max-w-5xl">
        <h3 className="text-xl font-bold mb-4 text-white">¿Quienes Somos?</h3>
        <hr className="mb-5 w-full text-primary z-30" />
        <P>
          Estas problemáticas suponen un gran gasto de tiempo, ya que para
          entornos grandes es difícil lograr plasmar todas las opiniones en un
          corto tiempo. Para esto, hemos creado un sistema que no solo cumplirá
          con lo anteriormente mencionado, sino que permitirá realizar
          votaciones, correcciones y mejoras durante el proceso, mediante la
          retroalimentación que envía el resto de personas.
        </P>
      </section>
    </article>
  );
}

export default Info;
