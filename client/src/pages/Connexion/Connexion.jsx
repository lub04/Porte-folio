import useAuth from "../../hooks/useAuth";

import errorToast from "../../components/Toast/errorToast";
import successToast from "../../components/Toast/successToast";
import "./Connexion.css";

function Connexion() {
  const { user, setUser, login } = useAuth();

  const handleCheckLog = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(user);
    if (response.success) {
      setUser({ email: "", password: "" });
      successToast("yeah boy");
    } else {
      errorToast(response.msg);
    }
  };

  return (
    <form
      className="connexion-form page-display-form box"
      onSubmit={handleSubmit}
    >
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
      <button className="button" type="submit">
        Se connecter
      </button>
    </form>
  );
}

export default Connexion;
