import { useState } from "react";

import { usePortefolio } from "../context/PortefolioContext";
import connexion from "../services/connexion";

const useAuth = () => {
  const initialUser = { email: "", password: "" };
  const [user, setUser] = useState(initialUser);
  const { handleUser } = usePortefolio();

  const login = async (testedUser) => {
    try {
      const response = await connexion.post(`/api/user/login`, testedUser);
      if (response.status === 200) {
        const userConnected = response.data;
        setUser(userConnected);
        handleUser(userConnected);
        return {
          success: true,
          msg: "Connexion réussie",
        };
      }
      return {
        success: false,
        msg: "Réponse inattendue du serveur",
      };
    } catch (err) {
      return {
        success: false,
        msg: "Email ou mot de passe incorrect",
      };
    }
  };

  const logout = async () => {
    try {
      const response = await connexion.post("/api/logout");
      if (response.status === 200) {
        setUser(initialUser);
        return {
          success: true,
          msg: "Déconnexion réussie",
        };
      }
      return {
        success: false,
        msg: "Une erreur est survenue lors de la déconnexion.",
      };
    } catch (err) {
      return {
        success: false,
        msg: "Une erreur est survenue lors de la déconnexion.",
      };
    }
  };

  return {
    user,
    setUser,
    login,
    logout,
  };
};

export default useAuth;
