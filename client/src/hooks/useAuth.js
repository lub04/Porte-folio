import { useState } from "react";

import { usePortefolio } from "../context/PortefolioContext";

import connexion from "../services/connexion";
import successToast from "../components/Toast/successToast";
import errorToast from "../components/Toast/errorToast";

const useAuth = () => {
  const initialUser = { email: "", password: "" };
  const [user, setUser] = useState(initialUser);
  const { handleUser } = usePortefolio();

  const login = async (testedUser) => {
    try {
      const response = await connexion.post(`/api/user/login`, testedUser);
      if (response.status === 200) {
        const userConnected = response.data;
        handleUser(userConnected);
        setUser(userConnected);
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
      const response = await connexion.post("/api/user/logout");
      if (response.status === 200) {
        setUser(initialUser);
        handleUser(null);
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
      console.error("Erreur lors de la déconnexion :", err);
      return {
        success: false,
        msg: "Une erreur est survenue lors de la déconnexion.",
      };
    }
  };

  const handleLogOut = async (event) => {
    event.preventDefault();
    const response = await logout();
    if (response.success) {
      successToast(response.msg);
    } else {
      errorToast(response.msg);
    }
  };
  return {
    user,
    setUser,
    login,
    handleLogOut,
  };
};

export default useAuth;
