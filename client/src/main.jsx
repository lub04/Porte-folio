import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import AllProjects from "./pages/AllProjects/AllProjects";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import Home from "./pages/Home/Home";
import Connexion from "./pages/Connexion/Connexion";
import Messagerie from "./pages/Messagerie/Messagerie";
import ConnectedLayout from "./layout/ConnectedLayout";

import connexion from "./services/connexion";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import { PortefolioProvider } from "./context/PortefolioContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: async () => {
          try {
            const home = await connexion.get("/api/home/1");
            return home.data;
          } catch (error) {
            throw new Error(error);
          }
        },
      },
      {
        path: "projets",
        element: <AllProjects />,
      },
      {
        path: "projets/:id",
        element: <ProjectDetail />,
        loader: async ({ params }) => {
          try {
            const project = await connexion.get(`/api/projects/${params.id}`);
            return project.data;
          } catch (error) {
            throw new Error(error);
          }
        },
      },
      {
        path: "lubin",
        element: <About />,
        loader: async () => {
          try {
            const project = await connexion.get("/api/user/1");
            return project.data;
          } catch (error) {
            throw new Error(error);
          }
        },
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "connexion",
        element: <Connexion />,
      },
    ],
  },
  {
    path: "/",
    element: <ConnectedLayout />,
    children: [
      {
        path: "messages",
        element: <Messagerie />,
        loader: async () => {
          try {
            const project = await connexion.get("/api/messages");
            return project.data;
          } catch (error) {
            throw new Error(error);
          }
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <PortefolioProvider>
      <RouterProvider router={router} />
    </PortefolioProvider>
  </React.StrictMode>
);
