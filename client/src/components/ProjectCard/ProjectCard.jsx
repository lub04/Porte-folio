import { Link } from "react-router-dom";
import "./ProjectCard.css";
import { usePortefolio } from "../../context/PortefolioContext";

function ProjectCard({ project, css, projectListLength }) {
  const { logUser, handleDeleteProject } = usePortefolio();

  return (
    <div
      className={
        logUser && projectListLength > 1 ? `delete-display ${css}` : css
      }
    >
      <Link to={`${project.id}`}>
        <img
          src={`${import.meta.env.VITE_API_URL}/${project.logo}`}
          alt={project.name}
        />
        <p>{project.name}</p>
      </Link>
      {logUser && projectListLength > 1 && (
        <button
          type="button"
          className="button delete-button"
          onClick={() => handleDeleteProject(project.id)}
        >
          Supprimer
        </button>
      )}
    </div>
  );
}

export default ProjectCard;
