import { useState } from "react";
import { Link } from "react-router-dom";

import ValidationModal from "../ValidationModal/ValidationModal";

import { usePortefolio } from "../../context/PortefolioContext";
import "./ProjectCard.css";

function ProjectCard({ project, css, projectListLength }) {
  const { logUser } = usePortefolio();
  const [validationDeleteModal, setValidationDeleteModal] = useState(false);
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
          onClick={() => setValidationDeleteModal(true)}
        >
          Supprimer
        </button>
      )}
      <ValidationModal
        validationModalIsOpen={validationDeleteModal}
        setValidationModalIsOpen={setValidationDeleteModal}
        id={project.id}
        reinitializeState={null}
        closeModal={null}
        text1="Êtes-vous sûre de vouloir supprimer ce projet ?"
        text2="Toute suppression de la base de donnée est définitive !"
      />
    </div>
  );
}

export default ProjectCard;
