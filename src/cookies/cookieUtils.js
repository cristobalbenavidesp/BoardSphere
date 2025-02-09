import Cookies from "js-cookie";

export const getSessionFromCookie = () => {
  const savedSession = Cookies.get("session");
  return savedSession ? JSON.parse(savedSession) : null;
};

export const setSessionCookie = (userData) => {
  Cookies.set("session", JSON.stringify(userData), { expires: 7 });
};

export const removeSessionCookie = () => {
  Cookies.remove("session");
};
