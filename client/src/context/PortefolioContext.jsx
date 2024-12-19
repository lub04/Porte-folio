import {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";

const PortefolioContext = createContext();

export function PortefolioProvider({ children }) {
  const [logUser, setLogUser] = useState(null);

  const handleUser = useCallback((user) => {
    if (user) {
      localStorage.setItem("LogUser", JSON.stringify(user));
      setLogUser(user);
    } else {
      localStorage.removeItem("LogUser");
      setLogUser(null);
    }
  }, []);

  const checkTokenExpiration = useCallback(() => {
    const savedUser = localStorage.getItem("LogUser");
    if (savedUser) {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        if (!token) {
          localStorage.removeItem("LogUser");
          setLogUser(null);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
        localStorage.removeItem("LogUser");
        setLogUser(null);
      }
    }
  }, []);
  useEffect(() => {
    const savedUser = localStorage.getItem("LogUser");
    if (savedUser) {
      setLogUser(JSON.parse(savedUser));
    } else {
      setLogUser(null);
    }
  }, [checkTokenExpiration]);

  useEffect(() => {
    const intervalId = setInterval(checkTokenExpiration, 300000);
    return () => clearInterval(intervalId);
  }, [checkTokenExpiration]);
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
