import { useEffect, useState } from "react";

import { usePortefolio } from "../../context/PortefolioContext";
import "./FormProject.css";

function FormProject({
  handleSubmitProject,
  stepChecked,
  step,
  isCreated,
  detail,
  project,
}) {
  const {
    newProject,
    setNewProject,
    fetchCategories,
    fetchStatus,
    allCategories,
    allStatus,
  } = usePortefolio();
  const [isDeployed, setIsDeployed] = useState(false);

  const checkProjectDeployed = () => {
    setIsDeployed(!isDeployed);
    if (isDeployed === false) {
      setNewProject((prevProject) => ({
        ...prevProject,
        website_link: "",
      }));
    }
  };
  useEffect(() => {
    fetchStatus();
    fetchCategories();
    if (detail && project) {
      setNewProject({
        name: project.name,
        github_link: project.github_link,
        website_link: project.website_link,
        team: project.team,
        main_technologies: project.main_technologies,
        organization: project.organization,
        description: project.description,
        project_category_id: project.project_category_id,
        status_id: project.status_id,
      });
      setIsDeployed(!!project.website_link); // Mise à jour de `isDeployed`
    }
  }, [detail, fetchCategories, fetchStatus, project, setNewProject]);

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

  if (step && stepChecked !== step) return null;

  return (
    <form onSubmit={handleSubmitProject}>
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
          {allCategories.map((category) => (
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
          checked={isDeployed}
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
      <label className="normal-select">
        Statut du projet :
        <select
          name="status_id"
          value={newProject.status_id}
          onChange={handleCreateProject}
        >
          <option value="">--- Choisissez un statut ---</option>
          {allStatus.map((state) => (
            <option key={state.id} value={state.id}>
              {state.status}
            </option>
          ))}
        </select>
      </label>
      <label className="normal-text-input">
        Les trois principales technologies utilisées :
        <input
          required
          onChange={handleCreateProject}
          type="text"
          name="main_technologies"
          value={newProject.main_technologies}
        />
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
        L'organisation :
        <textarea
          required
          name="organization"
          value={newProject.organization}
          onChange={handleCreateProject}
        />
      </label>
      <button type="submit" className="button">
        {isCreated ? "Valider !" : "Créer le projet"}
      </button>
    </form>
  );
}

export default FormProject;
