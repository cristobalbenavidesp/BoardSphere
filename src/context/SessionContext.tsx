"use client";
import { createContext, ReactNode, useEffect } from "react";
import { User } from "@prisma/client";
import useSessionStorage from "@/hooks/useSessionStorage";
import { usePathname, useRouter } from "next/navigation";

// Crea el contexto
export type sessionContextType = {
  session: User | null;
  login: ((RUT: string, password: string) => void) | null;
  logout: (() => void) | null;
  signUp: (user: User) => void;
};

const SessionContext = createContext<sessionContextType>({
  session: null,
  login: null,
  logout: null,
  signUp: () => {},
});

// Proveedor del contexto
const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useSessionStorage(null);
  const router = useRouter();
  const pathname = usePathname();

  const login = (RUT: string, password: string) => {
    const controller = new AbortController();
    fetch(`/api/users/${RUT}?password=${password}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al iniciar sesión");
        return response.json();
      })
      .then((data) => {
        if (!data.RUT) throw new Error("Usuario no encontrado");
        setSession(data);
        import("react-hot-toast").then(({ toast }) => {
          toast.success(`Bienvenido, ${data.first_name} ${data.last_name}`);
        });
      })
      .catch((error: { message: string }) => {
        import("react-hot-toast").then(({ toast }) => {
          toast.error(`Error al iniciar sesión: ${error.message}`);
        });
      });
  };

  // Función para cerrar sesión
  const logout = () => {
    setSession(null);
  };

  const signUp = async (user: User) => {
    const controller = new AbortController();
    return fetch(`/api/users/${user.RUT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data: Omit<User, "password">) => {
        setSession(data);
        import("react-hot-toast").then(({ toast }) => {
          toast.success(`Bienvenido, ${data.first_name} ${data.last_name}`);
        });
      })
      .catch((error: { message: string }) => {
        import("react-hot-toast").then(({ toast }) => {
          toast.error(`Error al iniciar sesión: ${error.message}`);
        });
      });
  };

  useEffect(() => {
    if (
      !session &&
      pathname !== "/" &&
      pathname !== "/login" &&
      pathname !== "/signup"
    ) {
      router.push("/login");
    }
  }, [session, router, pathname]);

  // Valor del contexto que estará disponible en los componentes descendientes
  const contextValue: sessionContextType = {
    session,
    login,
    logout,
    signUp,
  };

  return (
    <SessionContext.Provider value={contextValue as sessionContextType}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
