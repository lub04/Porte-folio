import { ToastContainer } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import errorToast from "../../components/Toast/errorToast";
import successToast from "../../components/Toast/successToast";
import "./Connexion.css";
import { usePortefolio } from "../../context/PortefolioContext";

function Connexion() {
  const { user, setUser, login, handleLogOut } = useAuth();
  const { logUser } = usePortefolio();

  const handleCheckLog = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleConnect = async (event) => {
    event.preventDefault();
    const response = await login(user);
    if (response.success) {
      setUser({ email: "", password: "" });
      successToast(response.msg);
    } else {
      errorToast(response.msg);
    }
  };

  return (
    <form
      className="connexion-form page-display-form box"
      onSubmit={logUser ? handleLogOut : handleConnect}
    >
      {logUser ? (
        <h2>Vous êtes connecté</h2>
      ) : (
        <>
          <label>
            Identifiant :
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleCheckLog}
            />
          </label>
          <label>
            Mot de passe :
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleCheckLog}
            />
          </label>
        </>
      )}
      {logUser ? (
        <button className="button" type="submit">
          Se déconnecter
        </button>
      ) : (
        <button className="button" type="submit">
          Se connecter
        </button>
      )}
      <ToastContainer />
    </form>
  );
}

export default Connexion;
