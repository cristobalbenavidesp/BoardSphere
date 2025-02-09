import { useState, useEffect } from "react";

function useSessionStorage(initialValue: any) {
  const [storedValue, setStoredValue] = useState<any>(() => {
    try {
      const item = window.sessionStorage.getItem("session");
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    window.sessionStorage.setItem("session", JSON.stringify(storedValue));
  }, [storedValue]);

  const setValue = (value: any) => {
    try {
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

export default useSessionStorage;
