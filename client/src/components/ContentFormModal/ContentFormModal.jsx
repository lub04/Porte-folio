import { useEffect, useState } from "react";
import connexion from "../../services/connexion";
import "./ContentFormModal.css";

function ContentFormModal({ stepChecked, projectId, render, setRender }) {
  const [project, setProject] = useState(null);
  const [projectSkills, setProjectSkills] = useState(null);

  const handleDeleteSkill = async (skillId) => {
    try {
      await connexion.delete(`/api/projectSkill/${projectId}/skill/${skillId}`);
      setRender(!render);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await connexion.get(`/api/Projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du projet", error);
      }
    };
    const fetchSkills = async () => {
      try {
        const response = await connexion.get(`/api/projectSkill/${projectId}`);
        setProjectSkills(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des skills", error);
      }
    };
    if (projectId) {
      fetchProject();
      fetchSkills();
    }
  }, [projectId, render]);

  if (!project) {
    return <p>Chargement du projet...</p>;
  }

  if (stepChecked === 2 || stepChecked === 3 || stepChecked === 4) {
    return (
      <section className="picture-form-content">
        {project.pictures.logo && (
          <article className="logo-main-image content-box">
            <h3>Logo :</h3>
            <img
              src={`${import.meta.env.VITE_API_URL}/${project.pictures.logo}`}
              alt="logo du projet"
            />
          </article>
        )}
        {project.pictures.main && (
          <article className="logo-main-image content-box">
            <h3>Image principale :</h3>
            <img
              src={`${import.meta.env.VITE_API_URL}/${project.pictures.main}`}
              alt="exemple principal du projet"
            />
          </article>
        )}
        {project.pictures.screenshots &&
          project.pictures.screenshots.length > 0 && (
            <article className="screenshot-image content-box">
              <h3>Screenshots :</h3>
              <div className="screenshots">
                {project.pictures.screenshots.map((screenshot, index) => (
                  <img
                    key={screenshot}
                    src={`${import.meta.env.VITE_API_URL}/${screenshot}`}
                    alt={`Exemple du projet ${index + 1}`}
                  />
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
  return null;
}
export default ContentFormModal;
