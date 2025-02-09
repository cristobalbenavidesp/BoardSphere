"use client";
import { useSession } from "@/hooks/useSession";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
function LoginForm() {
  const { login } = useSession();
  const router = useRouter();
  function handleSubmit(e) {
    e.preventDefault();
    login(e.target[0].value, e.target[1].value);
  }

  return (
    // Formulario de inicio de sesión
    <>
      <div className="bg-neutral-50 w-fit min-w-[23em] px-10 py-20 rounded-md text-white max-w-xs shadow-xl">
        <h3 className="font-semibold text-center mb-4 text-blue-700">
          Inicia sesión o regístrate
        </h3>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="text-blue-700 text-sm mb-2">RUT</label>
          <input
            placeholder="RUT (Con puntos y guion)"
            className="p-2 mb-4 text-black border border-secondary-dark rounded-lg"
            type={"text"}
          />
          <label className="text-blue-700 text-sm mb-2">Contraseña</label>
          <input
            placeholder="contraseña"
            className="p-2 mb-4 text-black border border-secondary-dark rounded-lg"
            type={"password"}
          />
          <button
            type="submit"
            className="bg-blue-800 mb-4 text-white font-semibold shadow-lg rounded py-1"
          >
            Iniciar Sesión
          </button>
          <Link href="signup">
            <button className="bg-blue-600 text-white font-semibold shadow-lg rounded py-1 w-full">
              Registrarme
            </button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
