"use client";

import SignUpForm from "../../components/form/SignUpForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import { useSession } from "@/hooks/useSession";

const SignUpPage = () => {
  const router = useRouter();
  const { login, logout, signUp, session } = useSession();

  return (
    <main className="w-full h-screen grid place-items-center bg-blue-200/50">
      {session ? (
        <div className="text-blue-700">
          <p>Bienvenido, {session.first_name}!</p>
          <button
            onClick={(e) => {
              logout!();
            }}
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <SignUpForm
          handleSignUp={(user: User) => {
            signUp(user);
          }}
        />
      )}
    </main>
  );
};

export default SignUpPage;
