import { useLoaderData } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";

import github from "../../assets/images/icons/github.svg";
import users from "../../assets/images/icons/users.svg";
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
            src={project.img1}
            alt="exemple du site 1"
          />
          <div className="technics">
            <article className="badges box">
              <img src={users} alt="icone groupe" />
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
                <p>{project.main_technologies}</p>
              </article>
            </div>
          </div>
        </section>
        <section className="project-description-organisation box">
          <article className="project-description">
            <h3>L'application :</h3>
            <p>{project.description}</p>
          </article>
          <article className="project-organisation">
            <h3>L'organisation :</h3>
            <p>{project.organization}</p>
          </article>
          <article className="project-images">
            <button
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
