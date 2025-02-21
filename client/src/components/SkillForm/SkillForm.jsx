import { useEffect, useState } from "react";

import connexion from "../../services/connexion";
import "./SkillForm.css";
import ContentFormModal from "../ContentFormModal/ContentFormModal";

function SkillForm({ stepChecked, step, projectId }) {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await connexion.get("/api/skill");
        setSkills(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSkills();
  }, []);

  if (stepChecked !== step) return null;

  return (
    <>
      <ContentFormModal stepChecked={stepChecked} projectId={projectId} />
      <form action="">
        <label className="normal-select">
          Ajouter une compétence :
          <select name="" id="">
            <option value="">
              ---- Selectionnez les compétences utilisés sur ce projet ----
            </option>
            {skills.map((skill) => (
              <option key={skill.id}>{skill.name}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="button">
          Ajouter !
        </button>
      </form>
    </>
  );
}

export default SkillForm;
