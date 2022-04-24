import { useState } from "react";
import { useCallback } from "react";

export const UserAccount = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [userEmail, setUserEmail] = useState();

  const login = useCallback((uid, uName, uEmail) => {
    setIsLoggedIn(true);
    setUserId(uid);
    setUserName(uName);
    setUserEmail(uEmail);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setUserName(null);
    setUserEmail(null);
  }, []);

  return { userId, isLoggedIn, userName, userEmail, login, logout };
};
