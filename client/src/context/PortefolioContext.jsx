import {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";

import connexion from "../services/connexion";

const PortefolioContext = createContext();

export function PortefolioProvider({ children }) {
  const [logUser, setLogUser] = useState(null);

  const checkToken = useCallback(async () => {
    try {
      await connexion.get("api/messages");
    } catch (error) {
      console.error("Token invalide ou expiré:", error);
      setLogUser(null);
      localStorage.removeItem("LogUser");
    }
  }, []);

  const handleUser = useCallback((user) => {
    if (user) {
      localStorage.setItem("LogUser", JSON.stringify(user));
      setLogUser(user);
    } else {
      localStorage.removeItem("LogUser");
      setLogUser(null);
    }
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("LogUser");
    if (savedUser) {
      setLogUser(JSON.parse(savedUser));
    } else {
      setLogUser(null);
    }
    checkToken();
  }, [checkToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkToken();
    }, 300000);

    return () => clearInterval(interval);
  }, [checkToken]);

  const value = useMemo(() => ({ logUser, handleUser }), [logUser, handleUser]);

  return (
    <PortefolioContext.Provider value={value}>
      {children}
    </PortefolioContext.Provider>
  );
}

PortefolioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const usePortefolio = () => useContext(PortefolioContext);
