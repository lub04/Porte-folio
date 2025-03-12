import { useLoaderData } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";

import ExpandableSection from "../../components/ExpandableSection/ExpandableSection";

import github from "../../assets/images/icons/github.svg";
import users from "../../assets/images/icons/users.svg";
import user from "../../assets/images/icons/user.svg";
import cpu from "../../assets/images/icons/cpu.svg";
import link from "../../assets/images/icons/link.svg";
import "./ProjectDetail.css";

function ProjectDetail() {
  const project = useLoaderData();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const openModal = (image) => {
    setActiveImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setActiveImage(null);
  };
  return (
    <>
      <h2>{project.name}</h2>
      <section className="page-display">
        <section className="project-demo">
          <img
            className="primary-image box"
            src={`${import.meta.env.VITE_API_URL}/${project.pictures.main}`}
            alt="exemple du site 1"
          />
          <article className="technics">
            <section className="badges box">
              <div className="info-badge">
                <img
                  src={
                    project.project_category !== "Projet Perso" ? users : user
                  }
                  alt={
                    project.project_category !== "Projet Perso"
                      ? "icone groupe"
                      : "icone projet perso"
                  }
                />
                <p className="badge">{project.project_category}</p>
              </div>
              <div className="info-badge">
                <img src={cpu} alt="icone cpu" />
                <p className="badge">{project.main_technologies}</p>
              </div>
              <div className="info-badge">
                <img src={github} alt="icone github" />
                <a
                  className="badge badge-link"
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </div>
              <div className="info-badge">
                <img src={link} alt="icone lien" />
                {project.website_link ? (
                  <a
                    className="badge badge-link"
                    href={project.website_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Application déployée
                  </a>
                ) : (
                  <p>Le site n'est pas déployé</p>
                )}
              </div>
            </section>
            <section className="project-team-skills box">
              <article>
                <h3>Statut du projet : </h3>
                <p>{project.project_status}</p>
              </article>
              <article>
                <h3>L'équipe :</h3>
                {project.team ? <p>{project.team}</p> : <p>Lubin Chauvreau</p>}
              </article>
              <article>
                <h3>Compétences utilisées :</h3>

                {project.categorized_skills.map((skillList) => (
                  <p key={skillList.skills[0]}>
                    {skillList.skills.length !== 0
                      ? `${skillList.category}: ${skillList.skills.join(", ")}`
                      : ""}
                  </p>
                ))}
              </article>
            </section>
          </article>
        </section>
        <section className="project-description-organisation box">
          <ExpandableSection
            title="L'aplication"
            content={project.description}
            message={false}
            isRead
          />
          <ExpandableSection
            title="L'organisation"
            content={project.organization}
            message={false}
            isRead
          />
          <article className="project-images">
            {project.pictures.screenshots.map((screenshot) => (
              <button
                key={screenshot}
                className={modalIsOpen ? "no-hover" : "button-example-img"}
                type="button"
                onClick={() =>
                  openModal(`${import.meta.env.VITE_API_URL}/${screenshot}`)
                }
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    openModal(`${import.meta.env.VITE_API_URL}/${screenshot}`);
                  }
                }}
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}/${screenshot}`}
                  alt="exemple du site 2"
                />
              </button>
            ))}
          </article>
        </section>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="Modal"
        appElement={document.getElementById("root")}
      >
        {activeImage && (
          <img
            className="image-modal"
            src={activeImage}
            alt="exemple du site"
          />
        )}
        <button
          type="button"
          className="button-close-modal"
          onClick={closeModal}
        >
          X
        </button>
      </Modal>
    </>
  );
}

export default ProjectDetail;
