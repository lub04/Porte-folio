import { useEffect, useState } from "react";

import ButtonDelete from "../ButtonDelete/ButtonDelete";
import DotsLoader from "../DotsLoader/DotsLoader";

import { usePortefolio } from "../../context/PortefolioContext";
import connexion from "../../services/connexion";
import "./ContentFormModal.css";
import ButtonDeleteImage from "../ButtonDeleteImage/ButtonDeleteImage";

function ContentFormModal({
  stepChecked,
  projectId,
  isProject,
  avatar,
  setSkillList,
  setSelectedSkill,
}) {
  const { render, handleDeleteImage, handleDeleteSkill } = usePortefolio();
  const [project, setProject] = useState(null);
  const [projectSkills, setProjectSkills] = useState([]);
  const [pictures, setPictures] = useState(null);

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

  const handleDeleteSkillProject = async (skillId) => {
    try {
      await handleDeleteSkill(projectId, skillId);
      setProjectSkills((prevSkills) => {
        const updatedSkills = prevSkills.filter(
          (skill) => skill.skill_id !== skillId
        );

        // Si après suppression il n'y a plus de skill, reset skillList
        if (updatedSkills.length === 0) {
          setSkillList({
            project_id: projectId,
            skill_id: null,
          });
          setSelectedSkill("");
        }

        return updatedSkills;
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (isProject) {
    if (!project) {
      return <DotsLoader />;
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
                <ButtonDeleteImage
                  key={screenshot.id}
                  handleDelete={handleDeleteImage}
                  id={screenshot.id}
                  url={screenshot.url}
                  index={index}
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
      return <DotsLoader />;
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
              <ButtonDelete
                key={skill.skill_id}
                id={skill.skill_id}
                handleDelete={handleDeleteSkillProject}
                name={skill.skill_name}
              />
            ))}
          </div>
        ))}
      </section>
    );
  }

  if (stepChecked === 6) {
    if (!project) {
      return <DotsLoader />;
    }
    return (
      <>
        <section className="recap-project-display">
          <p>Titre du projet : {project.name}</p>
          <p>Liens github : {project.github_link}</p>
          <p>
            Lien du site :
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
                  key={screenshot.id}
                  src={`${import.meta.env.VITE_API_URL}/${screenshot.url}`}
                  alt={`exemple ${index + 1} du projet`}
                />
              ))}
            </div>
          </article>
        </section>
        <section className="recap-project-display">
          {project.categorizedSkills.map((category) => (
            <p key={category.category}>
              {category.category} :{" "}
              {category.skillsList.map((skill) => skill.name).join(", ")}
            </p>
          ))}
        </section>
      </>
    );
  }
  if (stepChecked === "modify-avatar") {
    return (
      <article className="avatar-image content-box">
        <h3>Image actuelle :</h3>
        <img
          src={`${import.meta.env.VITE_API_URL}/${avatar}`}
          alt="Aperçu de l'élément à modifier"
        />
      </article>
    );
  }

  return null;
}
export default ContentFormModal;
