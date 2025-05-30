import { useEffect, useState } from "react";

import connexion from "../../services/connexion";
import "./SkillForm.css";
import ContentFormModal from "../ContentFormModal/ContentFormModal";
import { usePortefolio } from "../../context/PortefolioContext";

function SkillForm({
  stepChecked,
  step,
  projectId,
  handleSubmit,
  setProjectSkill,
  setSkillList,
  isProject,
}) {
  const { render } = usePortefolio();
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");

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
    setSelectedSkill(value);
    setProjectSkill({
      project_id: projectId,
      [name]: value,
    });
  };
  if (stepChecked !== step) return null;

  return (
    <>
      {isProject && (
        <ContentFormModal
          stepChecked={stepChecked}
          projectId={projectId}
          setSkillList={setSkillList}
          setSelectedSkill={setSelectedSkill}
        />
      )}
      <form onSubmit={handleSubmit} className="skill-form">
        <label className="large-select">
          Ajouter une compétence :
          <select
            name="skill_id"
            onChange={handleAddSkill}
            value={selectedSkill}
          >
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
