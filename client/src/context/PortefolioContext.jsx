import {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";

// Créer le contexte utilisateur
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

  useEffect(() => {
    const savedUser = localStorage.getItem("LogUser");
    if (savedUser) {
      setLogUser(JSON.parse(savedUser));
    } else {
      setLogUser(null);
    }
  }, []);

  // Mémorisation de l'objet value pour éviter les rendus inutiles
  const value = useMemo(() => ({ logUser, handleUser }), [logUser, handleUser]);

  return (
    <PortefolioContext.Provider value={value}>
      {children}
    </PortefolioContext.Provider>
  );
}

// Ajouter la validation des propriétés
PortefolioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const usePortefolio = () => useContext(PortefolioContext);
