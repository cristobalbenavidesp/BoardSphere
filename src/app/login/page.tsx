"use client";
import LoginForm from "../../components/form/LoginForm";
import { useSession } from "@/hooks/useSession";

const LoginPage = () => {
  const { logout, session } = useSession();

  return (
    <article className="w-full h-screen grid place-items-center bg-blue-200/50">
      {session ? (
        <div>
          <p>Bienvenido, {session.first_name}!</p>
          <button
            onClick={() => {
              logout!();
            }}
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <LoginForm />
      )}
    </article>
  );
};

export default LoginPage;
