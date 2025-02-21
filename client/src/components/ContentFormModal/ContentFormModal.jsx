import { useEffect, useState } from "react";
import connexion from "../../services/connexion";
import "./ContentFormModal.css";

function ContentFormModal({ stepChecked, projectId, render }) {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await connexion.get(`/api/Projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du projet", error);
      }
    };
    if (projectId) {
      fetchProject();
    }
  }, [projectId, render]);

  // Si `project` n'est pas encore chargé, on ne rend rien ou on affiche un loader.
  if (!project) {
    return <p>Chargement du projet...</p>;
  }

  if (stepChecked === 2 || stepChecked === 3 || stepChecked === 4) {
    return (
      <section className="picture-form-content">
        {project.pictures.logo && (
          <article className="logo-main-image">
            <h4>Logo :</h4>
            <img
              src={`${import.meta.env.VITE_API_URL}/${project.pictures.logo}`}
              alt="logo du projet"
            />
          </article>
        )}
        {project.pictures.main && (
          <article className="logo-main-image">
            <h4>Image principale :</h4>
            <img
              className="logo-main-image"
              src={`${import.meta.env.VITE_API_URL}/${project.pictures.main}`}
              alt="exemple principal du projet"
            />
          </article>
        )}
        {project.pictures.screenshots &&
          project.pictures.screenshots.length > 0 && (
            <article className="screenshot-image">
              <h4>Screenshots :</h4>
              <div className="screenshots">
                {project.pictures.screenshots.map((screenshot, index) => (
                  <img
                    key={screenshot} // Utilisation de l'index comme clé
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
    return (
      <section>
        {project.categorized_skills.map((category) => {
          if (category.skills.length > 0) {
            return (
              <div key={category.category}>
                <h4>{category.category}</h4>
                {category.skills.map((skill) => (
                  <button key={skill} type="button">
                    {skill} x
                  </button>
                ))}
              </div>
            );
          }
          return null;
        })}
      </section>
    );
  }

  return null;
}

export default ContentFormModal;
