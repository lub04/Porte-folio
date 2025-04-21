import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";

import ExpandableSection from "../../components/ExpandableSection/ExpandableSection";
import DotsLoader from "../../components/DotsLoader/DotsLoader";
import ImageForm from "../../components/ImageForm/ImageForm";
import FormProject from "../../components/FormProject/FormProject";
import successToast from "../../components/Toast/successToast";
import errorToast from "../../components/Toast/errorToast";

import connexion from "../../services/connexion";
import { usePortefolio } from "../../context/PortefolioContext";
import github from "../../assets/images/icons/github.svg";
import users from "../../assets/images/icons/users.svg";
import user from "../../assets/images/icons/user.svg";
import cpu from "../../assets/images/icons/cpu.svg";
import link from "../../assets/images/icons/link.svg";
import "./ProjectDetail.css";
import ButtonDeleteImage from "../../components/ButtonDeleteImage/ButtonDeleteImage";
import ButtonImageModal from "../../components/ButtonImageModal/ButtonImageModal";

function ProjectDetail() {
  const {
    logUser,
    modalType,
    modalTitle,
    openModal,
    closeModal,
    modalIsOpen,
    handleModifyProject,
    setNewProject,
    initialProject,
    render,
    setRender,
    setFileName,
    handleDeleteImage,
    uploadModifyProjectImage,
    uploadProjectImage,
  } = usePortefolio();

  const inputRefLogo = useRef();
  const inputRefMainImage = useRef();
  const inputRefScreenshot = useRef();

  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await connexion.get(`/api/projects/${id}`);
        setProject(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    if (id) {
      fetchProject();
    }
  }, [id, render]);

  const openModalImage = (image) => {
    setActiveImage(image);
    openModal("", "image");
  };

  const closeModalImage = () => {
    closeModal();
    setActiveImage(null);
  };
  const closeAdminModal = () => {
    setNewProject(initialProject);
    setFileName("");
    closeModal();
  };

  const handleModifyProjectActive = async (e) => {
    e.preventDefault();
    await handleModifyProject(project.id);
    closeModal();
    setRender(!render);
  };

  const handleSubmitModifyImage = async (event) => {
    event.preventDefault();
    try {
      if (modalType === "modify logo") {
        await uploadModifyProjectImage(
          inputRefLogo.current.files[0],
          project.id,
          "logo"
        );
        successToast("Logo modifié avec succès");
      }
      if (modalType === "modify main picture") {
        await uploadModifyProjectImage(
          inputRefMainImage.current.files[0],
          project.id,
          "main"
        );
        successToast("Image principale modifié avec succès");
      }
      setRender(!render);
      setFileName("");
    } catch (error) {
      console.error(error);
      errorToast("L'application ne supporte pas ce format d'image !");
    }
  };

  const handleSubmitAddScreenshots = async (event) => {
    event.preventDefault();
    try {
      await uploadProjectImage(
        inputRefScreenshot.current.files[0],
        project.id,
        "screenshot"
      );
      setRender(!render);
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <DotsLoader />;
  }
  return (
    <>
      <h2>{project.name}</h2>
      {logUser && (
        <button
          type="button"
          className="button"
          onClick={() => openModal("Modifiez le projet", "modify project")}
        >
          Modifier le projet
        </button>
      )}
      <section className="page-display">
        <section className="project-demo">
          {logUser && (
            <button
              type="button"
              className="button"
              onClick={() =>
                openModal("Modifiez l'image principale", "modify main picture")
              }
            >
              Modifier l'image principale
            </button>
          )}
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
            {logUser && (
              <div className="admin-modify-logo">
                <img
                  className="admin-logo-project"
                  src={`${import.meta.env.VITE_API_URL}/${project.pictures.logo}`}
                  alt="logo"
                />
                <button
                  type="button"
                  className="button"
                  onClick={() => openModal("Modifiez le logo :", "modify logo")}
                >
                  Modifier le logo
                </button>
              </div>
            )}
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
            {project.pictures.screenshots.map((screenshot, index) =>
              logUser ? (
                <ButtonDeleteImage
                  key={screenshot.id}
                  handleDelete={handleDeleteImage}
                  id={screenshot.id}
                  url={screenshot.url}
                  index={index}
                />
              ) : (
                <ButtonImageModal
                  key={screenshot.id}
                  modalIsOpen={modalIsOpen}
                  openModalImage={openModalImage}
                  url={screenshot.url}
                />
              )
            )}
            {logUser && (
              <ImageForm
                label="Ajoutez un screenshot :"
                handleSubmit={handleSubmitAddScreenshots}
                inputRef={inputRefScreenshot}
              />
            )}
          </article>
        </section>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={activeImage ? closeModalImage : closeAdminModal}
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
        {modalType === "modify project" && (
          <>
            <h3>{modalTitle}</h3>
            <FormProject
              project={project}
              isCreated
              detail
              handleSubmitProject={handleModifyProjectActive}
            />
          </>
        )}
        {modalType === "modify main picture" && (
          <>
            <h3>{modalTitle}</h3>
            <ImageForm
              avatar={project.pictures.main}
              label="Séléctionnez une nouvelle image principale"
              inputRef={inputRefMainImage}
              isProject={false}
              step={null}
              handleSubmit={handleSubmitModifyImage}
              stepChecked="modify-avatar"
            />
          </>
        )}
        {modalType === "modify logo" && (
          <>
            <h3>{modalTitle}</h3>
            <ImageForm
              avatar={project.pictures.logo}
              label="Séléctionnez un nouveau logo"
              inputRef={inputRefLogo}
              isProject={false}
              step={null}
              handleSubmit={handleSubmitModifyImage}
              stepChecked="modify-avatar"
            />
          </>
        )}
        <button
          type="button"
          className="button-close-modal"
          onClick={closeAdminModal}
        >
          X
        </button>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default ProjectDetail;
