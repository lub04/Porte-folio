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

function Home() {
  const home = useLoaderData();
  const inputRefAvatar = useRef();

  const { logUser, projectsList, fetchProject } = usePortefolio();
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [welcome, setWelcome] = useState(home.welcome);
  const [presentation, setPresentation] = useState(home.presentation);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const closeModal = () => {
    setModalIsOpen(false);
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
          <button type="button" className="presentation-button">
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
        <button
          type="button"
          className="button-close-modal"
          onClick={closeModal}
        >
          X
        </button>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Home;
