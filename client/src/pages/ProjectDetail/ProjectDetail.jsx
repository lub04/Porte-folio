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

  const projectSkills = project.categorized_skills.split("|");
  return (
    <>
      <h2>{project.name}</h2>
      <section className="page-display">
        <section className="project-demo">
          <img
            className="primary-image box"
            src={project.img1}
            alt="exemple du site 1"
          />
          <div className="technics">
            <article className="badges box">
              <img
                src={project.category !== "Projet Perso" ? users : user}
                alt={
                  project.category !== "Projet Perso"
                    ? "icone groupe"
                    : "icone projet perso"
                }
              />
              <p className="badge">{project.category}</p>
              <img src={cpu} alt="icone cpu" />
              <p className="badge">{project.main_technologies}</p>
              <img src={github} alt="icone github" />
              <a
                className="badge badge-link"
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
              <img src={link} alt="icone lien" />
              <a
                className="badge badge-link"
                href={project.website_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Application déployée
              </a>
            </article>
            <div className="project-team-skills box">
              <article className="team">
                <h3>L'équipe :</h3>
                <p>{project.team}</p>
              </article>
              <article className="skills">
                <h3>Compétences utilisées :</h3>
                {projectSkills.map((category) => (
                  <p key={category}>{category}</p>
                ))}
              </article>
            </div>
          </div>
        </section>
        <section className="project-description-organisation box">
          <ExpandableSection
            title="L'aplication"
            content={project.description}
          />
          <ExpandableSection
            title="L'organisation"
            content={project.organization}
          />
          <article className="project-images">
            <button
              className={modalIsOpen ? "no-hover" : "button-example-img"}
              type="button"
              onClick={() => openModal(project.img2)}
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openModal(project.img2);
                }
              }}
            >
              <img src={project.img2} alt="exemple du site 2" />
            </button>
            <button
              className={modalIsOpen ? "no-hover" : "button-example-img"}
              type="button"
              onClick={() => openModal(project.img3)}
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openModal(project.img3);
                }
              }}
            >
              <img src={project.img3} alt="exemple du site 3" />
            </button>
            <button
              className={modalIsOpen ? "no-hover" : "button-example-img"}
              type="button"
              onClick={() => openModal(project.img4)}
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openModal(project.img4);
                }
              }}
            >
              <img src={project.img4} alt="exemple du site 4" />
            </button>{" "}
          </article>
        </section>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="Modal"
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
