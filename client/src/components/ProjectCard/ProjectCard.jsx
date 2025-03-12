import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard({ project, css }) {
  return (
    <Link to={`${project.id}`} className={css}>
      <img
        src={`${import.meta.env.VITE_API_URL}/${project.logo}`}
        alt={project.name}
      />
      <p>{project.name}</p>
    </Link>
  );
}

export default ProjectCard;
