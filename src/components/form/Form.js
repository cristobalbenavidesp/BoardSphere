import React from "react";

function Form() {
  return (
    <div className="bg-secondary w-fit p-4 rounded-md text-white max-w-xs shadow-xl shadow-secondary-dark/60">
      <h3 className="text-sm font-semibold text-center mb-4">
        Ingresa tu e-mail y podrás mantenerte al tanto de nuestro progreso
      </h3>
      <form className="flex flex-col">
        <input
          placeholder="ejemplo@dominio.com"
          className="p-2 mb-4 text-black"
          type={"email"}
        />
        <button className="text-primary bg-white rounded py-1">
          {" "}
          Aceptar{" "}
        </button>
      </form>
    </div>
  );
}

export default Form;
