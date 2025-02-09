import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";

export function useSession() {
  const { session, login, logout, signUp } = useContext(SessionContext);

  return { session, login, logout, signUp };
}
