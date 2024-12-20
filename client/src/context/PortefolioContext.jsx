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

  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  };

  const checkTokenExpiration = useCallback(() => {
    const savedUser = localStorage.getItem("LogUser");

    if (savedUser) {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        if (token) {
          if (!isTokenExpired(token)) {
            // Le token est valide, on ne fait rien
            return;
          }
        }

        // Si le token est inexistant ou expiré, on déconnecte l'utilisateur
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("LogUser");
        setLogUser(null);
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
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (token && !isTokenExpired(token)) {
        setLogUser(JSON.parse(savedUser));
      } else {
        localStorage.removeItem("LogUser");
        setLogUser(null);
      }
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!(token && !isTokenExpired(token))) {
        checkTokenExpiration();
      }
    }, 300000);

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
