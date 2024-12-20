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
import successToast from "../components/Toast/successToast";

const PortefolioContext = createContext();

export function PortefolioProvider({ children }) {
  const [logUser, setLogUser] = useState(null);

  // Fonction pour vérifier si le token est présent et valide
  const checkToken = useCallback(async () => {
    try {
      await connexion.get("api/messages", {
        withCredentials: true,
      });
      successToast("votre token est valide");
    } catch (error) {
      console.error("Token invalide ou expiré:", error);
      setLogUser(null);
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
      checkToken(); // Vérifier le token toutes les 5 minutes, par exemple
    }, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(interval); // Nettoyer l'intervalle lors de la destruction du composant
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
