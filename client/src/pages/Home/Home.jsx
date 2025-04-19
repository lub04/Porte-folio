/* eslint-disable import/no-unresolved */
import { useLoaderData, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useState, useEffect, useRef, useCallback } from "react";
import { ToastContainer } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCreative } from "swiper/modules";

import ModifyUserForm from "../../components/ModifyUserForm/ModifyUserForm";
import successToast from "../../components/Toast/successToast";
import errorToast from "../../components/Toast/errorToast";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import TextAreaForm from "../../components/TextAreaForm/TextAreaForm";
import ImageForm from "../../components/ImageForm/ImageForm";

import connexion from "../../services/connexion";
import { usePortefolio } from "../../context/PortefolioContext";
import github from "../../assets/images/icons/github.svg";
import githubHover from "../../assets/images/icons/github(2).svg";
import linkedin from "../../assets/images/icons/linkedin(1).svg";
import linkedinHover from "../../assets/images/icons/linkedin(2).svg";
import rightArrow from "../../assets/images/icons/chevron-right-white.svg";
import "./Home.css";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DotsLoader from "../../components/DotsLoader/DotsLoader";

function Home() {
  const home = useLoaderData();
  const inputRefAvatar = useRef();
  const inputRefCv = useRef();
  const {
    logUser,
    projectsList,
    fetchProject,
    modalTitle,
    modalType,
    openModal,
    closeModal,
    modalIsOpen,
    render,
    setRender,
  } = usePortefolio();
  const navigate = useNavigate();

  const [colorLinkedin, setColorLinkedin] = useState(linkedin);
  const [colorGithub, setColorGithub] = useState(github);
  const [cvModalIsOpen, setCvModalIsOpen] = useState(false);
  const [modifyUserModalIsOpen, setModifyUserModalIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [presentation, setPresentation] = useState(home.presentation);

  const fetchUser = useCallback(async () => {
    const response = await connexion.get("/api/user/1");
    setUser(response.data);
  }, []);

  useEffect(() => {
    fetchProject();
    fetchUser();
  }, [fetchProject, fetchUser, render]);

  const closeCvModal = () => {
    setCvModalIsOpen(false);
  };

  const closeModifyUserModal = () => {
    setModifyUserModalIsOpen(false);
    setRender(!render);
  };

  const handleModifyHomePageText = (event) => {
    const { value } = event.target;

    if (modalType === "presentation") {
      setPresentation(value);
    }
  };

  const handleSubmitModifyHomePage = async (event) => {
    event.preventDefault();
    try {
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

  const openCvModal = () => {
    setCvModalIsOpen(true);
  };
  const openModifyUserModal = () => {
    setModifyUserModalIsOpen(true);
  };

  const handleSubmitCv = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("CV", inputRefCv.current.files[0]);
      await connexion.put("/api/user/1?selector=user-resume", formData);
      setRender(!render);
      successToast("CV mis à jour avec succès !");
    } catch (error) {
      console.error(error);
      errorToast(
        "Un problème est survenu lors de la mise à jour de votre CV !"
      );
    }
  };

  if (!user) {
    return <DotsLoader />;
  }
  return (
    <>
      <h2 className="title-home">Entrez dans mon univers ...</h2>
      <section className="home-welcome page-display">
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
              {user.first_name} {user.last_name} - Développeur web full stack
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
            <img
              src={rightArrow}
              alt="fléche vers la droite"
              className="right-arrow"
            />
            <p className="button-presentation-text">En savoir plus !</p>
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
        {modalType === "presentation" && (
          <TextAreaForm
            handleSubmit={handleSubmitModifyHomePage}
            handleModify={handleModifyHomePageText}
            label="Texte de présentation :"
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
            handleSubmit={handleSubmitModifyHomePage}
            avatar={home.img}
            stepChecked="modify-avatar"
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
            {logUser && (
              <button
                type="button"
                className="button"
                onClick={openModifyUserModal}
              >
                Modifier le profil
              </button>
            )}
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
      {cvModalIsOpen && (
        <Modal
          isOpen={cvModalIsOpen}
          onRequestClose={closeCvModal}
          contentLabel="CV Modal"
          className="modal-small"
          appElement={document.getElementById("root")}
        >
          {logUser && (
            <ImageForm
              handleSubmit={handleSubmitCv}
              inputRef={inputRefCv}
              label="Modifiez votre CV :"
            />
          )}
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
      {modifyUserModalIsOpen && (
        <Modal
          isOpen={modifyUserModalIsOpen}
          onRequestClose={closeModifyUserModal}
          contentLabel="CV Modal"
          className="modal-small"
          appElement={document.getElementById("root")}
        >
          <ModifyUserForm
            user={user}
            setUser={setUser}
            closeModifyUserModal={closeModifyUserModal}
          />
          <button
            type="button"
            className="button-close-modal"
            onClick={closeModifyUserModal}
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
