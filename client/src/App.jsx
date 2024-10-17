import { Outlet } from "react-router-dom";

import HomeHeader from "./components/HomeHeader/HomeHeader";

import "./App.css";

function App() {
  return (
    <>
      <HomeHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
