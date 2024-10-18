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
          <img src={home.img} alt="" />
          <p style={{ whiteSpace: "pre-line" }}>{home.presentation}</p>
        </article>
      </section>
    </>
  );
}

export default Home;
