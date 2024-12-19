import { Link } from "react-router-dom";
import "./Header.css";
import { usePortefolio } from "../../context/PortefolioContext";

function Header({ css, css2 }) {
  const { logUser } = usePortefolio();

  return (
    <header className={`${css} ${css2}`}>
      <nav>
        {logUser ? (
          <Link className="navigation" to="messages">
            Messagerie
          </Link>
        ) : null}
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
      <Link className="return-home" to="/">
        <h1 id="top-page">L'atelier du développeur</h1>
      </Link>
    </header>
  );
}

export default Header;
