import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import AllProjects from "./pages/AllProjects/AllProjects";

import connexion from "./services/connexion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "projets",
        element: <AllProjects />,
        loader: async () => {
          try {
            const projects = await connexion.get("/api/projects");
            return projects.data;
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
