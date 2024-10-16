import { useLoaderData } from "react-router-dom";

import github from "../../assets/images/icons/github.svg";
import users from "../../assets/images/icons/users.svg";
import cpu from "../../assets/images/icons/cpu.svg";
import link from "../../assets/images/icons/link.svg";
import "./ProjectDetail.css";

function ProjectDetail() {
  const project = useLoaderData();

  return (
    <>
      <h2>{project.name}</h2>
      <section className="page-display">
        <section className="project-demo">
          <img
            className="primary-image"
            src={project.img1}
            alt="exemple du site 1"
          />
          <div className="technics">
            <article className="badges">
              <p className="badge">
                <img src={users} alt="icone groupe" />
                {project.category}
              </p>
              <p className="badge">
                <img src={cpu} alt="icone cpu" /> {project.main_technologies}
              </p>
              <a className="badge" href={project.github_link} target="blank">
                <img src={github} alt="icone github" />
                Github
              </a>
              <a className="badge" href={project.website_link} target="blank">
                <img src={link} alt="icone lien" />
                Site web
              </a>
            </article>
            <article>
              <h3>L'équipe</h3>
              <p>{project.team}</p>
            </article>
            <article>
              <h3>Compétences utilisées</h3>
              <p>{project.main_technologies}</p>
            </article>
          </div>
        </section>
        <section className="project-description-organisation">
          <article className="project-description">
            <h3>Description de l'application</h3>
            <p>{project.description}</p>
          </article>
          <article className="project-organisation">
            <h3>L'organisation</h3>
            <p>{project.organization}</p>
          </article>
          <article className="project-images">
            <img src={project.img2} alt="exemple du site 2" />
            <img src={project.img3} alt="exemple du site 3" />
            <img src={project.img4} alt="exemple du site 4" />
          </article>
        </section>
      </section>
    </>
  );
}

export default ProjectDetail;
