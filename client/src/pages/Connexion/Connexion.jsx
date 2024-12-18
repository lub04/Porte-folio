import "./Connexion.css";

function Connexion() {
  return (
    <form className="connexion-form page-display-form box">
      <label>
        Identifiant :
        <input type="email" />
      </label>
      <label>
        Mot de passe :
        <input type="password" />
      </label>
      <button className="button" type="submit">
        Se connecter
      </button>
    </form>
  );
}

export default Connexion;
