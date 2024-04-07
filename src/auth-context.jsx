import { createContext, useEffect, useState } from 'react';
import { useUser } from './features/authentication/useUser';

const AuthContext = createContext({
  isLoggedIn: false,
  user: {},
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoading, isAuthenticated, user } = useUser();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      setIsLoggedIn(isAuthenticated);
    }
  }, [isAuthenticated, isLoading]);

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logOutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login: loginHandler, logout: logOutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
