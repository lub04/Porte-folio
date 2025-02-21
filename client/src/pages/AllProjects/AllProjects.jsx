import { useLoaderData, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Modal from "react-modal";

import ProjectCard from "../../components/ProjectCard/ProjectCard";

import { usePortefolio } from "../../context/PortefolioContext";
import connexion from "../../services/connexion";
import "./AllProjects.css";
import ImageForm from "../../components/ImageForm/ImageForm";
import FormProject from "../../components/FormProject/FormProject";
import SkillForm from "../../components/SkillForm/SkillForm";

const initialProject = {
  name: "",
  github_link: "",
  website_link: "",
  team: "",
  main_technologies: "",
  organization: "",
  description: "",
  project_category_id: "0",
  status_id: 1,
};

function AllProjects() {
  const projects = useLoaderData();
  const { logUser } = usePortefolio();
  const inputRefLogo = useRef();
  const inputRefMainImage = useRef();
  const inputRefScreenshots = useRef();
  const navigate = useNavigate();

  const [newProject, setNewProject] = useState(initialProject);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isLogoChoosen, setIsLogoChoosen] = useState(false);
  const [isMainPictureChoosen, setIsMainPictureChoosen] = useState(false);
  const [stepChecked, setStepChecked] = useState(1);
  const [idNewProject, setIdNewProject] = useState(null);
  const [render, setRender] = useState(false);

  const openModalAddProject = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setNewProject(initialProject);
    setModalIsOpen(false);
  };

  const goToNextStep = () => {
    setStepChecked(stepChecked + 1);
  };

  const goToPrevStep = (e) => {
    e.preventDefault();
    setStepChecked(stepChecked - 1);
  };

  const handleSubmitProject = async (event) => {
    event.preventDefault();
    if (!isCreated) {
      try {
        const response = await connexion.post("/api/projects", newProject);
        setIsCreated(true);
        const projectId = response.data.insertId;
        setIdNewProject(projectId);
        goToNextStep();
      } catch (error) {
        console.error("Erreur lors de la création du projet :", error);
      }
    } else {
      goToNextStep();
    }
  };

  const handleSubmitImage = async (event) => {
    event.preventDefault();

    if (stepChecked === 2) {
      if (!isLogoChoosen) {
        try {
          const formData = new FormData();
          formData.append("image", inputRefLogo.current.files[0]);
          formData.append("project_id", idNewProject);
          formData.append("type", "logo");
          await connexion.post(`/api/image`, formData);
          setIsLogoChoosen(true);
          goToNextStep();
          navigate(".", { replace: true });
        } catch (error) {
          console.error(error);
        }
      }
      goToNextStep();
    }
    if (stepChecked === 3) {
      if (!isMainPictureChoosen) {
        try {
          const formData = new FormData();
          formData.append("image", inputRefMainImage.current.files[0]);
          formData.append("project_id", idNewProject);
          formData.append("type", "main");
          await connexion.post(`/api/image`, formData);
          setIsMainPictureChoosen(true);
          goToNextStep();
          navigate(".", { replace: true });
        } catch (error) {
          console.error(error);
        }
      }
      goToNextStep();
    }
    if (stepChecked === 4) {
      try {
        const formData = new FormData();
        formData.append("image", inputRefScreenshots.current.files[0]);
        formData.append("project_id", idNewProject);
        formData.append("type", "screenshot");
        await connexion.post(`/api/image`, formData);
        setRender(!render);
        navigate(".", { replace: true });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const titleModal = () => {
    if (stepChecked === 1) {
      return <h3 className="modal-title">Votre nouveau projet</h3>;
    }
    if (stepChecked === 2) {
      return <h3 className="modal-title">Ajoutez un logo</h3>;
    }
    if (stepChecked === 3) {
      return <h3 className="modal-title">Ajoutez une image principale</h3>;
    }
    if (stepChecked === 4) {
      return <h3 className="modal-title">Ajoutez des screenshots</h3>;
    }
    return <h3 className="modal-title">Ajoutez des compétences</h3>;
  };
  return (
    <>
      <h2>Mes projets</h2>
      {logUser ? (
        <button className="button" type="button" onClick={openModalAddProject}>
          Ajouter un projet
        </button>
      ) : null}
      <section className="page-display projects-list">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="Modal"
      >
        {titleModal()}
        <FormProject
          handleSubmitProject={handleSubmitProject}
          stepChecked={stepChecked}
          step={1}
          newProject={newProject}
          setNewProject={setNewProject}
        />
        <ImageForm
          stepChecked={stepChecked}
          step={2}
          handleSubmit={handleSubmitImage}
          inputRef={inputRefLogo}
          label="Logo du projet :"
          projectId={idNewProject}
          render={null}
        />
        <ImageForm
          stepChecked={stepChecked}
          step={3}
          handleSubmit={handleSubmitImage}
          inputRef={inputRefMainImage}
          label="Image principale du projet :"
          projectId={idNewProject}
          render={null}
        />
        <ImageForm
          stepChecked={stepChecked}
          step={4}
          handleSubmit={handleSubmitImage}
          inputRef={inputRefScreenshots}
          label="Screenshots :"
          projectId={idNewProject}
          render={render}
        />
        <SkillForm
          stepChecked={stepChecked}
          step={5}
          projectId={idNewProject}
        />

        {stepChecked === 4 && (
          <button type="button" className="button" onClick={goToNextStep}>
            Prochaine étape
          </button>
        )}

        {stepChecked !== 1 && (
          <button type="button" className="button" onClick={goToPrevStep}>
            Retour
          </button>
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

export default AllProjects;
