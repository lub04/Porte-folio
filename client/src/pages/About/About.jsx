import { useLoaderData } from "react-router-dom";
import "./About.css";

function About() {
  const user = useLoaderData();

  return (
    <div className="page-display">
      <h2>À Propos</h2>
      <section className="box">
        <article>
          <img
            src={`${import.meta.env.VITE_API_URL}/${user.avatar}`}
            alt="avatar de Lubin"
          />
          <p>
            {user.first_name} {user.last_name}
          </p>
          <div>
            <p>{user.phone}</p>
            <p>{user.email}</p>
            <a href={user.github}>{user.github}</a>
            <a href={user.linkedin}>{user.linkedin}</a>
          </div>
        </article>
        <p>{user.description}</p>
      </section>
    </div>
  );
}

export default About;
