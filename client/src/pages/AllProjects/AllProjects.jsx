import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "react-modal";

import ProjectCard from "../../components/ProjectCard/ProjectCard";

import { usePortefolio } from "../../context/PortefolioContext";
import connexion from "../../services/connexion";
import "./AllProjects.css";
import ImageForm from "../../components/ImageForm/ImageForm";

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

  const [newProject, setNewProject] = useState(initialProject);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [stepChecked, setStepChecked] = useState(1);
  const [categories, setCategories] = useState([]);
  // const [idNewProject, setIdNewProject] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await connexion.get("/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleCreateProject = (event) => {
    const { name, value } = event.target;
    setNewProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
    if (
      newProject.project_category_id === "2" ||
      newProject.project_category_id === "0"
    ) {
      setNewProject((prevProject) => ({
        ...prevProject,
        team: "",
      }));
    }
  };

  const openModalAddProject = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setNewProject(initialProject);
    setModalIsOpen(false);
  };

  const checkProjectDeployed = () => {
    setIsDeployed(!isDeployed);
    if (isDeployed === false) {
      setNewProject((prevProject) => ({
        ...prevProject,
        website_link: "",
      }));
    }
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
        // const response =
        await connexion.post("/api/projects", newProject);
        setIsCreated(true);

        // const projectId = response.data.insertId;
        // setIdNewProject(projectId);

        goToNextStep();
      } catch (error) {
        console.error("Erreur lors de la création du projet :", error);
      }
    } else {
      goToNextStep();
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
    return <h3 className="modal-title">Ajoutez des screenshots</h3>;
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
        <form
          className={stepChecked !== 1 ? "none" : ""}
          onSubmit={handleSubmitProject}
        >
          <label className="normal-text-input">
            Nom du projet :
            <input
              required
              onChange={handleCreateProject}
              type="text"
              name="name"
              value={newProject.name}
            />
          </label>
          <label className="normal-text-input">
            Lien Github :
            <input
              required
              onChange={handleCreateProject}
              type="text"
              name="github_link"
              value={newProject.github_link}
            />
          </label>
          <label className="normal-select">
            Catégorie du projet :
            <select
              required
              value={newProject.project_category_id}
              onChange={handleCreateProject}
              name="project_category_id"
            >
              <option value="0">-- Choisissez une categorie --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category}
                </option>
              ))}
            </select>
            {newProject.project_category_id !== "2" &&
            newProject.project_category_id !== "0" ? (
              <label className="large-text-input">
                Les membres de l'équipe :
                <input
                  onChange={handleCreateProject}
                  type="text"
                  name="team"
                  value={newProject.team}
                />
              </label>
            ) : null}
          </label>
          <label className="normal-checkbox-input">
            Le site est déployé
            <input
              type="checkbox"
              onChange={checkProjectDeployed}
              className="checkbox"
            />
            {isDeployed && (
              <label className="large-text-input">
                Lien du site :
                <input
                  onChange={handleCreateProject}
                  type="text"
                  name="website_link"
                  value={newProject.website_link}
                />
              </label>
            )}
          </label>
          <label className="normal-text-input">
            Description du projet :
            <textarea
              required
              name="description"
              value={newProject.description}
              onChange={handleCreateProject}
            />
          </label>
          <label className="normal-text-input">
            l'organisation :
            <textarea
              required
              name="organization"
              value={newProject.organization}
              onChange={handleCreateProject}
            />
          </label>
          <button type="submit" className="button">
            Prochaine étape
          </button>
        </form>
        <ImageForm
          stepChecked={stepChecked}
          step={2}
          goToNextStep={goToNextStep}
          label="Logo du projet :"
        />
        <ImageForm
          stepChecked={stepChecked}
          step={3}
          goToNextStep={goToNextStep}
          label="Image principale du projet :"
        />
        <ImageForm
          stepChecked={stepChecked}
          step={4}
          goToNextStep={goToNextStep}
          label="Screenshots :"
        />

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
