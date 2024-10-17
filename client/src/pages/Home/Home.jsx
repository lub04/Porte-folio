import { useLoaderData } from "react-router-dom";

import "./Home.css";

function Home() {
  const home = useLoaderData();

  return (
    <>
      <h2>Entrez dans mon univers ...</h2>
      <section className="home-welcome page-display">
        <p className="welcome">{home.welcome}</p>
        <article className="presentation">
          <img src={home.img} alt="" />
          <p>{home.presentation}</p>
        </article>
      </section>
    </>
  );
}

export default Home;
