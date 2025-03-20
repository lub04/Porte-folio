import { Navigate, Outlet } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import DotsLoader from "../components/DotsLoader/DotsLoader";

import { usePortefolio } from "../context/PortefolioContext";

function ConnectedLayout() {
  const { logUser, isLoading } = usePortefolio();

  if (isLoading) {
    return <DotsLoader />;
  }
  // Si l'utilisateur est connecté, on affiche le layout
  if (logUser) {
    return (
      <div className="container">
        <Header css="header" css2="background" />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

  return <Navigate to="/" replace />;
}

export default ConnectedLayout;
