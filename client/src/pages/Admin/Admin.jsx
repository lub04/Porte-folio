import { useEffect, useState } from "react";

import ButtonDelete from "../../components/ButtonDelete/ButtonDelete";

import connexion from "../../services/connexion";
import { usePortefolio } from "../../context/PortefolioContext";
import "./Admin.css";

function Admin() {
  const { fetchCategories, fetchStatus, status, categories } = usePortefolio();
  const [skills, setSkills] = useState([]);

  const fetchSkills = async () => {
    try {
      const response = await connexion.get("/api/skill");
      setSkills(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchStatus();
    fetchSkills();
  }, [fetchCategories, fetchStatus]);

  const handleDeleteStatus = async (id) => {
    try {
      console.error("hello world", id);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h2>back-office</h2>;
      <section className="page-display box admin-box">
        <h3>Statuts de projet :</h3>
        <article className="admin-section">
          {status.map((state) => (
            <ButtonDelete
              key={state.id}
              id={state.id}
              name={state.status}
              handleDelete={handleDeleteStatus}
            />
          ))}
        </article>
      </section>
      <section className="page-display box admin-box">
        <h3>Catégories de projet :</h3>
        <article className="admin-section">
          {categories.map((category) => (
            <ButtonDelete
              key={category.id}
              id={category.id}
              name={category.category}
              handleDelete={handleDeleteStatus}
            />
          ))}
        </article>
      </section>
      <section className="page-display box admin-box">
        <h3>Compétences utilisateur :</h3>
        <article className="admin-section">
          {skills.map((skill) => (
            <ButtonDelete
              key={skill.id}
              id={skill.id}
              name={skill.name}
              handleDelete={handleDeleteStatus}
            />
          ))}
        </article>
      </section>
    </>
  );
}

export default Admin;
