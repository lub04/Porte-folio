/* eslint-disable import/no-unresolved */
import { useLoaderData, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useState, useEffect } from "react";
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

function Home() {
  const home = useLoaderData();
  const { logUser, projectsList, fetchProject } = usePortefolio();
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [welcome, setWelcome] = useState(home.welcome);
  const openModalWelcome = () => {
    setModalIsOpen(true);
  };
  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleModifyWelcome = (event) => {
    const { value } = event.target;
    setWelcome(value);
  };
  const handleSubmitModifyWelcome = async (event) => {
    event.preventDefault();
    try {
      await connexion.put("api/home/1?selector=welcome", { welcome });
      navigate(".", { replace: true });
      successToast("Modification réalisée avec succès !");
      closeModal();
    } catch (error) {
      errorToast(
        "Une erreur est survenue lors de la modification du message de bienvenue !"
      );
      console.error(error);
    }
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
              onClick={openModalWelcome}
            >
              Modifier le texte
            </button>
          </article>
        ) : (
          <p className="welcome box">{home.welcome}</p>
        )}
        <article className="presentation box-without-padding">
          <img
            src={`${import.meta.env.VITE_API_URL}/${home.img}`}
            alt="avatar de Lubin page d'accueil"
          />
          <div className="presentation-personal-information">
            <h3 className="presentation-title">
              Lubin chauvreau - Développeur web fullstack
            </h3>
            <p>
              Dans mon atelier, vous trouverez une variété de projets, du
              développement backend (CRUD, sécurité avec argon2 et JWT, Multer)
              au frontend avec React et Sass. J'explore aussi des outils comme
              Git, Figma, Docker, et des méthodologies Agile et Scrum. Toujours
              en quête de nouveaux défis, je suis passionné par l'amélioration
              continue de mes compétences.
            </p>
          </div>
          <button type="button" className="presentation-button">
            En savoir plus !
          </button>
          <p className="presentation-text" style={{ whiteSpace: "pre-line" }}>
            {home.presentation}
          </p>
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
        mousewheel={{ forceToAxis: true }}
        pagination
        navigation
        loop
        modules={[EffectCreative, Pagination, Navigation]}
        className="swiper page-display"
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
      >
        <form onSubmit={handleSubmitModifyWelcome}>
          <label htmlFor="">
            Texte de bienvenue
            <textarea
              className="modal-textarea"
              value={welcome}
              name="welcome"
              onChange={handleModifyWelcome}
              required
            />
          </label>
          <button type="submit" className="button">
            Valider
          </button>
        </form>
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
