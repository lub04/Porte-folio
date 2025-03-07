import { useEffect, useState } from "react";

import connexion from "../../services/connexion";
import "./FormProject.css";

function FormProject({
  handleSubmitProject,
  stepChecked,
  step,
  newProject,
  setNewProject,
}) {
  const [isDeployed, setIsDeployed] = useState(false);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState([]);

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
    const fetchCategories = async () => {
      try {
        const response = await connexion.get("/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchStatus = async () => {
      try {
        const response = await connexion.get("/api/status");
        setStatus(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStatus();
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

  if (stepChecked !== step) return null;

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
      <label className="normal-select">
        Statut du projet :
        <select
          name="status_id"
          value={newProject.status_id}
          onChange={handleCreateProject}
        >
          <option value="">--- Choisissez un statut ---</option>
          {status.map((state) => (
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
        Prochaine étape
      </button>
    </form>
  );
}

export default FormProject;
