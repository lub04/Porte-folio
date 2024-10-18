import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import HomeHeader from "./components/HomeHeader/HomeHeader";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container">
      {isHomePage && !scrolled ? <HomeHeader /> : <Header />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
