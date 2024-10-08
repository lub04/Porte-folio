import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard({ project }) {
  return (
    <Link to={`projects/${project.id}`} className="project-card">
      <img src={project.logo_img} alt={project.name} />
      <p>{project.name}</p>
    </Link>
  );
}

export default ProjectCard;
