import { Link } from "react-router-dom";
import "./Header.css";
import { usePortefolio } from "../../context/PortefolioContext";
import useAuth from "../../hooks/useAuth";

function Header({ css, css2 }) {
  const { logUser } = usePortefolio();
  const { handleLogOut } = useAuth();

  return (
    <header className={`${css} ${css2}`}>
      <nav>
        <Link className="navigation" to="projets">
          Mes projets
        </Link>
        <Link className="navigation" to="lubin">
          À propos
        </Link>
        <Link className="navigation" to="contact">
          Contact
        </Link>
      </nav>
      {logUser ? (
        <nav className="admin-nav">
          <Link className="navigation" to="messages">
            Messagerie
          </Link>
          <Link className="navigation" to="/">
            Accueil
          </Link>
          <button
            type="button"
            className="button navigation deconnect-button"
            onClick={handleLogOut}
          >
            Déconnexion
          </button>
        </nav>
      ) : (
        <Link className="return-home" to="/">
          <h1 id="top-page">L'atelier du développeur</h1>
        </Link>
      )}
    </header>
  );
}

export default Header;
