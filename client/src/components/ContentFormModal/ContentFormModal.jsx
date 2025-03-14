import { useEffect, useState } from "react";

import connexion from "../../services/connexion";
import "./ContentFormModal.css";
import { usePortefolio } from "../../context/PortefolioContext";

function ContentFormModal({ stepChecked, projectId, isProject, avatar }) {
  const { render, setRender } = usePortefolio();
  const [project, setProject] = useState(null);
  const [projectSkills, setProjectSkills] = useState(null);
  const [pictures, setPictures] = useState(null);

  const handleDeleteSkill = async (skillId) => {
    try {
      await connexion.delete(`/api/projectSkill/${projectId}/skill/${skillId}`);
      setRender(!render);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await connexion.delete(`api/image/${imageId}`);
      setRender(!render);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const [projectRes, skillsRes, picturesRes] = await Promise.all([
        connexion.get(`/api/Projects/${projectId}`),
        connexion.get(`/api/projectSkill/${projectId}`),
        connexion.get(`/api/image?project=${projectId}`),
      ]);
      setProject(projectRes.data);
      setProjectSkills(skillsRes.data);
      setPictures(picturesRes.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données du projet",
        error
      );
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, render]);

  if (isProject) {
    if (!project) {
      return <p>Chargement du projet...</p>;
    }
  }

  if (stepChecked === 2 || stepChecked === 3 || stepChecked === 4) {
    return (
      <section className="picture-form-content">
        {pictures.logo && (
          <article className="logo-main-image content-box">
            <h3>Logo :</h3>
            <img
              src={`${import.meta.env.VITE_API_URL}/${pictures.logo.url}`}
              alt="logo du projet"
            />
          </article>
        )}
        {pictures.main && (
          <article className="logo-main-image content-box">
            <h3>Image principale :</h3>
            <img
              src={`${import.meta.env.VITE_API_URL}/${pictures.main.url}`}
              alt="exemple principal du projet"
            />
          </article>
        )}
        {pictures.screenshots && pictures.screenshots.length > 0 && (
          <article className="screenshot-image content-box">
            <h3>Screenshots :</h3>
            <div className="screenshots">
              {pictures.screenshots.map((screenshot, index) => (
                <button
                  className="no-button button-image"
                  type="button"
                  key={screenshot.id}
                  onClick={() => handleDeleteImage(screenshot.id)}
                  title="Supprimer l'image"
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${screenshot.url}`}
                    alt={`Exemple du projet ${index + 1}`}
                  />
                  <div className="delete-hover">X</div>
                </button>
              ))}
            </div>
          </article>
        )}
      </section>
    );
  }

  if (stepChecked === 5) {
    if (!projectSkills) {
      return <p>Chargement des skills...</p>;
    }

    const groupedSkills = projectSkills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});
    const hasSkills = Object.keys(groupedSkills).length > 0;

    return (
      <section className={hasSkills ? "skills-preview-form" : ""}>
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <div key={category} className="skill-by-category">
            <h3>{category} :</h3>
            {skills.map((skill) => (
              <button
                className="skill-button"
                key={skill.skill_id}
                type="button"
                onClick={() => handleDeleteSkill(skill.skill_id)}
              >
                {skill.skill_name} x
              </button>
            ))}
          </div>
        ))}
      </section>
    );
  }

  if (stepChecked === 6) {
    if (!project) {
      return <p>Chargement du projet...</p>;
    }
    return (
      <>
        <section className="recap-project-display">
          <p>Titre du projet : {project.name}</p>
          <p>Liens github : {project.github_link}</p>
          <p>
            Lien du site :{" "}
            {project.website_link
              ? project.website_link
              : "Le site n'est pas déployé"}
          </p>
          <p>L'équipe : {project.team ? project.team : "Lubin Chauvreau"}</p>
          <p>Les technos principales du projet : {project.main_technologies}</p>
          <p>L'organisation : {project.organization}</p>
          <p>Description du projet : {project.description}</p>
          <p>Categorie du projet : {project.project_category}</p>
          <p>Statut du projet : {project.project_status}</p>
        </section>
        <section className="picture-form-content">
          <article className="logo-main-image content-box">
            <h4>Logo :</h4>
            <img
              src={`${import.meta.env.VITE_API_URL}/${project.pictures.logo}`}
              alt="logo du projet"
            />
          </article>
          <article className="logo-main-image content-box">
            <h4>Image principale : </h4>
            <img
              src={`${import.meta.env.VITE_API_URL}/${project.pictures.main}`}
              alt="exemple principal du projet"
            />
          </article>
          <article className="screenshot-image content-box">
            <h4>Screenshots</h4>
            <div className="screenshots">
              {project.pictures.screenshots.map((screenshot, index) => (
                <img
                  className="recap-image"
                  key={screenshot}
                  src={`${import.meta.env.VITE_API_URL}/${screenshot}`}
                  alt={`exemple ${index + 1} du projet`}
                />
              ))}
            </div>
          </article>
        </section>
        <section className="recap-project-display">
          {project.categorized_skills.map((skillList) => (
            <p key={skillList.skills[0]}>
              {skillList.category} : {skillList.skills.join(", ")}
            </p>
          ))}
        </section>
      </>
    );
  }
  if (stepChecked === "modify-avatar") {
    return (
      <article className="avatar-image content-box">
        <h3>Avatar :</h3>
        <img src={`${import.meta.env.VITE_API_URL}/${avatar}`} alt="Avatar" />
      </article>
    );
  }

  return null;
}
export default ContentFormModal;
