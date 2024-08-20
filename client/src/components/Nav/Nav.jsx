import { Link } from "react-router-dom";

import "./Nav.css";

function Nav() {
  return (
    <nav className="nav-global">
      <Link to="/">Accueil</Link>
      <Link to="/">Mes projets</Link>
      <Link to="/">A propos</Link>
      <Link to="/">contact</Link>
    </nav>
  );
}

export default Nav;
