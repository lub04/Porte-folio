import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard({ project }) {
  return (
    <Link to={`${project.id}`} className="project-card">
      <img
        src={`${import.meta.env.VITE_API_URL}/${project.logo_img}`}
        alt={project.name}
      />
      <p>{project.name}</p>
    </Link>
  );
}

export default ProjectCard;
