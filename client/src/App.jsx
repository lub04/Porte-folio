import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import { usePortefolio } from "./context/PortefolioContext";
import "./App.css";

function App() {
  const { logUser } = usePortefolio();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 120;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container">
      {isHomePage && !scrolled && !logUser ? (
        <Header scrolled={scrolled} css="home-header" css2="" />
      ) : (
        <Header scrolled={scrolled} css="header" css2="background" />
      )}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
