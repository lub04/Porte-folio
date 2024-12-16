import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Modal from "react-modal";

import github from "../../assets/images/icons/github.svg";
import githubHover from "../../assets/images/icons/github(2).svg";
import linkedin from "../../assets/images/icons/linkedin(1).svg";
import linkedinHover from "../../assets/images/icons/linkedin(2).svg";
import "./About.css";

function About() {
  const user = useLoaderData();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [colorLinkedin, setColorLinkedin] = useState(linkedin);
  const [colorGithub, setColorGithub] = useState(github);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <>
      <h2>À Propos</h2>
      <div className="page-display about">
        <section className="about-info">
          <article className="box about-info-avatar">
            <img
              src={`${import.meta.env.VITE_API_URL}/${user.avatar}`}
              alt="avatar de Lubin"
            />
            <p>
              {user.first_name} {user.last_name}
            </p>
          </article>
          <article className="box about-info-contact">
            <p>{user.phone}</p>
            <p>{user.email}</p>
            <div className="social-network">
              <a target="blank" href={user.github}>
                <img
                  onMouseOver={() => setColorGithub(githubHover)} // Change la couleur à l'état hover
                  onFocus={() => setColorGithub(githubHover)}
                  onMouseOut={() => setColorGithub(github)}
                  onBlur={() => setColorGithub(github)}
                  src={colorGithub}
                  alt="github"
                />
              </a>
              <a target="blank" href={user.linkedin}>
                <img
                  onMouseOver={() => setColorLinkedin(linkedinHover)}
                  onFocus={() => setColorLinkedin(linkedinHover)}
                  onMouseOut={() => setColorLinkedin(linkedin)}
                  onBlur={() => setColorLinkedin(linkedin)}
                  src={colorLinkedin}
                  alt="linkedin"
                />
              </a>
            </div>
            <button className="button" type="button" onClick={openModal}>
              Mon CV !
            </button>
          </article>
        </section>
        <section className="box about-description">
          <h3>Découvrez mon parcours !</h3>
          <p style={{ whiteSpace: "pre-line" }}>{user.description}</p>
        </section>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Image Modal"
          className="Modal"
        >
          <iframe
            src={`${import.meta.env.VITE_API_URL}/${user.resume}`}
            width="100%"
            height="500px"
            style={{ border: "none" }}
            title="PDF Viewer"
          >
            Votre navigateur ne peux pas lire le pdf changez de navigateur !
          </iframe>
          <button
            type="button"
            className="button-close-modal"
            onClick={closeModal}
          >
            X
          </button>
        </Modal>
      </div>
    </>
  );
}

export default About;
