import { FormEvent, useRef } from "react";
import toast from "react-hot-toast";
import type { User } from "@prisma/client";
import Link from "next/link";

function SignUpForm({ handleSignUp }: { handleSignUp: (user: User) => void }) {
  const submitFormRef = useRef(null);
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const user: User = {
      RUT: ((e.target as HTMLFormElement)[0] as HTMLInputElement).value,
      first_name: ((e.target as HTMLFormElement)[1] as HTMLInputElement).value,
      last_name: ((e.target as HTMLFormElement)[2] as HTMLInputElement).value,
      email: ((e.target as HTMLFormElement)[3] as HTMLInputElement).value,
      profession: ((e.target as HTMLFormElement)[4] as HTMLInputElement).value,
      password: ((e.target as HTMLFormElement)[5] as HTMLInputElement).value,
      createdAt: new Date(),
      updatedAt: null,
    };

    // Lógica para registrar un usuario
    fetch(`api/users/${user.RUT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((user) => {
        handleSignUp(user);
      })
      .catch((error) => {
        toast.error("Error al registrar usuario");
        console.log(error);
      });
  }

  return (
    // Formulario de inicio de sesión
    <>
      <div className="bg-neutral-50 w-fit min-w-[23em] px-10 py-20 rounded-md text-white shadow-xl shadow-secondary-dark/60">
        <h3 className="font-semibold text-center mb-4 text-blue-700">
          Inicia sesión o registrate
        </h3>
        <form
          className="grid grid-cols-2 gap-5 justify-items-center"
          onSubmit={handleSubmit}
          ref={submitFormRef}
        >
          <div className="flex flex-col">
            <label className="text-blue-700 text-sm mb-2">RUT</label>
            <input
              placeholder="RUT (Sin puntos y con guión)"
              className="p-2 mb-4 text-black border border-blue-900 rounded-lg"
              type={"text"}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-blue-700 text-sm mb-2">Nombre</label>
            <input
              placeholder="Nombre"
              className="p-2 mb-4 text-black border border-blue-900 rounded-lg"
              type={"text"}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-blue-700 text-sm mb-2">Apellido</label>
            <input
              placeholder="Apellido"
              className="p-2 mb-4 text-black border border-blue-900 rounded-lg"
              type={"text"}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-blue-700 text-sm mb-2">Correo</label>
            <input
              placeholder="Correo"
              className="p-2 mb-4 text-black border border-blue-900 rounded-lg"
              type={"text"}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-blue-700 text-sm mb-2">Profesion</label>
            <input
              placeholder="Profesion"
              className="p-2 mb-4 text-black border border-blue-900 rounded-lg"
              type={"text"}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-blue-700 text-sm mb-2">Contraseña</label>
            <input
              placeholder="contraseña"
              className="p-2 mb-4 text-black border border-blue-900 rounded-lg"
              type={"password"}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 mb-2 text-white font-semibold shadow-lg rounded py-1 col-span-2 px-5"
          >
            Registrarme
          </button>
          <Link
            href="/login"
            className="text-blue-700 text-sm font-semibold col-span-2 text-center underline"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </form>
      </div>
    </>
  );
}

export default SignUpForm;
