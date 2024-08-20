import { Outlet } from "react-router-dom";

import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
