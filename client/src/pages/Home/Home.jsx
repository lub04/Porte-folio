/* eslint-disable import/no-unresolved */
import { useLoaderData, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useState, useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCreative } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";
import "swiper/css/pagination";

import connexion from "../../services/connexion";
import { usePortefolio } from "../../context/PortefolioContext";
import "./Home.css";
import successToast from "../../components/Toast/successToast";
import errorToast from "../../components/Toast/errorToast";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import TextAreaForm from "../../components/TextAreaForm/TextAreaForm";
import ImageForm from "../../components/ImageForm/ImageForm";
import github from "../../assets/images/icons/github.svg";
import githubHover from "../../assets/images/icons/github(2).svg";
import linkedin from "../../assets/images/icons/linkedin(1).svg";
import linkedinHover from "../../assets/images/icons/linkedin(2).svg";

function Home() {
  const home = useLoaderData();
  const inputRefAvatar = useRef();

  const { logUser, projectsList, fetchProject } = usePortefolio();
  const navigate = useNavigate();

  const [colorLinkedin, setColorLinkedin] = useState(linkedin);
  const [colorGithub, setColorGithub] = useState(github);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cvModalIsOpen, setCvModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [user, setUser] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [welcome, setWelcome] = useState(home.welcome);
  const [presentation, setPresentation] = useState(home.presentation);

  const fetchUser = async () => {
    const response = await connexion.get("/api/user/1");
    setUser(response.data);
  };
  useEffect(() => {
    fetchProject();
    fetchUser();
  }, [fetchProject]);

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const closeCvModal = () => {
    setCvModalIsOpen(false);
  };

  const handleModifyHomePageText = (event) => {
    const { value } = event.target;
    if (modalType === "welcome") {
      setWelcome(value);
    }
    if (modalType === "presentation") {
      setPresentation(value);
    }
  };
  const handleSubmitModifyHomePageText = async (event) => {
    event.preventDefault();
    try {
      if (modalType === "welcome") {
        await connexion.put("api/home/1?selector=welcome", { welcome });
      }
      closeModal();
      if (modalType === "presentation") {
        await connexion.put("api/home/1?selector=presentation", {
          presentation,
        });
        closeModal();
      }
      if (modalType === "avatar") {
        const formData = new FormData();
        formData.append("avatar", inputRefAvatar.current.files[0]);
        await connexion.put("api/home/1?selector=avatar", formData);
      }
      navigate(".", { replace: true });
      successToast("Modification réalisée avec succès !");
    } catch (error) {
      errorToast(
        "Une erreur est survenue lors de la modification du message de bienvenue !"
      );
      console.error(error);
    }
  };
  const openModal = (title, content) => {
    setModalTitle(title);
    setModalType(content);
    setModalIsOpen(true);
  };
  const openCvModal = () => {
    setCvModalIsOpen(true);
  };
  return (
    <>
      <h2 className="title-home">Entrez dans mon univers ...</h2>
      <section className="home-welcome page-display">
        {logUser ? (
          <article className="box welcome">
            <p className="welcome-admin">{home.welcome}</p>
            <button
              type="button"
              className="button modify-button"
              onClick={() =>
                openModal("Modifier le texte de bienvenue :", "welcome")
              }
            >
              Modifier le texte
            </button>
          </article>
        ) : (
          <p className="welcome box">{home.welcome}</p>
        )}
        <article className="presentation box-without-padding">
          {logUser ? (
            <div className="home-avatar-admin">
              <img
                src={`${import.meta.env.VITE_API_URL}/${home.img}`}
                alt="avatar de Lubin page d'accueil"
              />
              <button
                type="button"
                className="button modify-button"
                onClick={() => openModal("Modifier l'avatar :", "avatar")}
              >
                Modifier l'image
              </button>
            </div>
          ) : (
            <img
              src={`${import.meta.env.VITE_API_URL}/${home.img}`}
              alt="avatar de Lubin page d'accueil"
            />
          )}
          <div className="presentation-personal-information">
            <h3 className="presentation-title">
              Lubin chauvreau - Développeur web fullstack
            </h3>
            <p style={{ whiteSpace: "pre-line" }}>{home.presentation}</p>
            {logUser && (
              <button
                type="button"
                className="button modify-button"
                onClick={() =>
                  openModal(
                    "Modifier le texte de présentation :",
                    "presentation"
                  )
                }
              >
                Modifier le texte
              </button>
            )}
          </div>
          <button
            type="button"
            className="presentation-button"
            onClick={() => openModal("", "learn-more")}
          >
            En savoir plus !
          </button>
        </article>
      </section>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        effect="creative"
        creativeEffect={{
          prev: {
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        pagination
        navigation
        loop={projectsList.length > 1}
        modules={[EffectCreative, Pagination, Navigation]}
        className="swiper page-display-form"
      >
        {projectsList.map((project) => (
          <SwiperSlide key={project.id}>
            <ProjectCard
              project={project}
              css="project-card impair-width swiper-card"
              projectListLength={0}
              carousel
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="Modal"
        appElement={document.getElementById("root")}
      >
        <h3>{modalTitle}</h3>
        {modalType === "welcome" && (
          <TextAreaForm
            handleSubmit={handleSubmitModifyHomePageText}
            handleModify={handleModifyHomePageText}
            name="welcome"
            value={welcome}
          />
        )}
        {modalType === "presentation" && (
          <TextAreaForm
            handleSubmit={handleSubmitModifyHomePageText}
            handleModify={handleModifyHomePageText}
            name="presentation"
            value={presentation}
          />
        )}
        {modalType === "avatar" && (
          <ImageForm
            inputRef={inputRefAvatar}
            isProject={false}
            label="Modifier l'avatar"
            step={null}
            handleSubmit={handleSubmitModifyHomePageText}
            avatar={home.img}
          />
        )}
        {modalType === "learn-more" && (
          <div className="about">
            <section className="about-info">
              <article className="box about-info-avatar">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${home.img}`}
                  alt="avatar de Lubin"
                  className="avatar-picture"
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
                <button className="button" type="button" onClick={openCvModal}>
                  Mon CV !
                </button>
              </article>
            </section>
            <section className="box about-description">
              <h3>Découvrez mon parcours !</h3>
              <p style={{ whiteSpace: "pre-line" }}>{user.description}</p>
            </section>
          </div>
        )}
        <button
          type="button"
          className="button-close-modal"
          onClick={closeModal}
        >
          X
        </button>
      </Modal>
      {cvModalIsOpen && user && (
        <Modal
          isOpen={cvModalIsOpen}
          onRequestClose={closeCvModal}
          contentLabel="CV Modal"
          className="modal-small"
          appElement={document.getElementById("root")}
        >
          <iframe
            src={`${import.meta.env.VITE_API_URL}/${user.resume}`}
            width="100%"
            height="500px"
            style={{ border: "none" }}
            title="PDF Viewer"
          >
            Votre navigateur ne peut pas lire le PDF, changez de navigateur !
          </iframe>
          <button
            type="button"
            className="button-close-modal"
            onClick={closeCvModal}
          >
            X
          </button>
        </Modal>
      )}
      <ToastContainer />
    </>
  );
}

export default Home;
