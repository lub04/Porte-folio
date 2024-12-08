import { Link } from "react-router-dom";
import "./Header.css";

function Header({ css, css2 }) {
  return (
    <header className={`${css} ${css2}`}>
      <nav>
        <Link className="navigation" to="projets">
          Mes projets
        </Link>
        <Link className="navigation" to="projets">
          A propos
        </Link>
        <Link className="navigation" to="projets">
          Contact
        </Link>
      </nav>
      <Link className="return-home" to="/">
        <h1 id="top-page">L'atelier du développeur | Lubin Chauvreau</h1>
      </Link>
    </header>
  );
}

export default Header;
