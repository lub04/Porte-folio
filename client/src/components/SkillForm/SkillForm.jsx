import { useEffect, useState } from "react";

import connexion from "../../services/connexion";
import "./SkillForm.css";
import ContentFormModal from "../ContentFormModal/ContentFormModal";

function SkillForm({
  stepChecked,
  step,
  projectId,
  handleSubmit,
  setProjectSkill,
  render,
  setRender,
}) {
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
  }, [render]);

  const handleAddSkill = (event) => {
    const { name, value } = event.target;
    setProjectSkill({
      project_id: projectId,
      [name]: value,
    });
  };

  if (stepChecked !== step) return null;

  return (
    <>
      <ContentFormModal
        stepChecked={stepChecked}
        projectId={projectId}
        render={render}
        setRender={setRender}
      />
      <form onSubmit={handleSubmit} className="skill-form">
        <label className="large-select">
          Ajouter une compétence :
          <select name="skill_id" onChange={handleAddSkill}>
            <option value="">
              ---- Selectionnez les compétences utilisés sur ce projet ----
            </option>
            {skills.map((skill) => (
              <option value={skill.id} key={skill.id}>
                {skill.name}
              </option>
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
