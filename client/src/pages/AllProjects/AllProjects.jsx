import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "react-modal";

import ProjectCard from "../../components/ProjectCard/ProjectCard";

import { usePortefolio } from "../../context/PortefolioContext";
import "./AllProjects.css";

const initialProject = {
  name: "",
  github_link: "",
  website_link: "",
  team: "",
  main_technologies: "",
  organization: "",
  description: "",
  logo_img: "",
  img1: "",
  img2: "",
  img3: "",
  img4: "",
  project_category_id: "0",
  status_id: "",
};

function AllProjects() {
  const projects = useLoaderData();
  const { logUser } = usePortefolio();

  const [newProject, setNewProject] = useState(initialProject);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [firstStepChecked, setFirstStepChecked] = useState(false);

  useEffect(() => {
    if (
      newProject.project_category_id === "2" ||
      newProject.project_category_id === "0"
    ) {
      setNewProject((prevProject) => ({
        ...prevProject,
        team: "",
      }));
    }
  }, [newProject.project_category_id]);

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

  const goToNextStep = (e) => {
    e.preventDefault();
    setFirstStepChecked(!firstStepChecked);
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
        {firstStepChecked && (
          <button type="button" className="button" onClick={goToNextStep}>
            Retour
          </button>
        )}
        <form className="contact-form">
          <label className={firstStepChecked ? "none" : "normal-text-input"}>
            Nom du projet :
            <input
              required
              onChange={handleCreateProject}
              type="text"
              name="name"
              value={newProject.name}
            />
          </label>
          <label className={firstStepChecked ? "none" : "normal-text-input"}>
            Lien Github :
            <input
              required
              onChange={handleCreateProject}
              type="text"
              name="github_link"
              value={newProject.github_link}
            />
          </label>
          <label className={firstStepChecked ? "none" : "normal-select"}>
            catégorie du projet :
            <select
              required
              value={newProject.project_category_id}
              onChange={handleCreateProject}
              name="project_category_id"
            >
              <option value="0">Choisissez une categorie</option>
              <option value="1">Projet de groupe</option>
              <option value="2">Projet perso</option>
              <option value="3">Hackathon</option>
            </select>
            {newProject.project_category_id !== "2" &&
            newProject.project_category_id !== "0" ? (
              <label className="large-text-input">
                l'équipe :
                <input
                  onChange={handleCreateProject}
                  type="text"
                  name="team"
                  value={newProject.team}
                />
              </label>
            ) : null}
          </label>
          <label
            className={firstStepChecked ? "none" : "normal-checkbox-input"}
          >
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
          <label className={firstStepChecked ? "none" : "normal-text-input"}>
            Description du projet :
            <textarea
              required
              name="description"
              value={newProject.description}
              onChange={handleCreateProject}
            />
          </label>
          <label className={firstStepChecked ? "none" : "normal-text-input"}>
            l'organisation :
            <textarea
              required
              name="organization"
              value={newProject.organization}
              onChange={handleCreateProject}
            />
          </label>
          <label className={firstStepChecked ? "normal-text-input" : "none"}>
            Logo du projet :
            <input required type="file" />
          </label>
          <label className={firstStepChecked ? "normal-text-input" : "none"}>
            Image principale :
            <input required type="file" />
          </label>
          <label className={firstStepChecked ? "large-text-input" : "none"}>
            Image 2 :
            <input required type="file" />
          </label>
          <label className={firstStepChecked ? "large-text-input" : "none"}>
            Image 3 :
            <input required type="file" />
          </label>
          <label className={firstStepChecked ? "large-text-input" : "none"}>
            Image 4 :
            <input required type="file" />
          </label>
          {firstStepChecked === false ? (
            <button type="button" className="button" onClick={goToNextStep}>
              Prochaine étape
            </button>
          ) : (
            <button type="submit" className="button">
              Valider
            </button>
          )}
        </form>
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
