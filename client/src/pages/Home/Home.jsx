import { useLoaderData } from "react-router-dom";

import "./Home.css";

function Home() {
  const home = useLoaderData();

  return (
    <>
      <h2 className="title-home">Entrez dans mon univers ...</h2>
      <section className="home-welcome page-display">
        <p className="welcome box">{home.welcome}</p>
        <article className="presentation">
          <img
            src={`${import.meta.env.VITE_API_URL}/${home.img}`}
            alt="avatar de Lubin page d'accueil"
          />
          <p style={{ whiteSpace: "pre-line" }}>{home.presentation}</p>
        </article>
      </section>
    </>
  );
}

export default Home;
