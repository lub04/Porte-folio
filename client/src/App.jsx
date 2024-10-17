import { Outlet, useLocation } from "react-router-dom";

import HomeHeader from "./components/HomeHeader/HomeHeader";

import "./App.css";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <>
      {isHomePage ? <HomeHeader /> : null}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
