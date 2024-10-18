import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header background">
      <nav>
        <Link to="projets">Mes projets</Link>
        <Link to="projets">A propos</Link>
        <Link to="projets">Contact</Link>
      </nav>
      <h1>L'atelier du développeur</h1>
    </header>
  );
}

export default Header;
