"use client";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
function useAppContext() {
  const appContext = useContext(AppContext);
  return appContext;
}

export default useAppContext;
