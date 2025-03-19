import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";

import AdminSection from "../../components/AdminSection/AdminSection";
import InputForm from "../../components/InputForm/InputForm";
import successToast from "../../components/Toast/successToast";

import connexion from "../../services/connexion";
import { usePortefolio } from "../../context/PortefolioContext";
import "./Admin.css";
import ButtonAdmin from "../../components/ButtonAdmin/ButtonAdmin";

const initialQuote = {
  quote: "",
  author: "",
};

const initialSkill = {
  name: "",
  category_id: null,
};

const sectionArray = [
  {
    id: 1,
    title: "Statuts de projet",
  },
  {
    id: 2,
    title: "Catégories de projets",
  },
  {
    id: 3,
    title: "Compétences utilisateur",
  },
  {
    id: 4,
    title: "Catégories de compétences",
  },
  {
    id: 5,
    title: "Citations de développeurs",
  },
];

function Admin() {
  const {
    fetchCategories,
    fetchStatus,
    allStatus,
    allCategories,
    closeModal,
    modalIsOpen,
    modalType,
    modalTitle,
    render,
    setRender,
  } = usePortefolio();
  const [allSkills, setAllSkills] = useState([]);
  const [allQuotes, setAllQuotes] = useState([]);
  const [allSkillsCategories, setAllSkillsCategories] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState("");
  const [newSkill, setNewSkill] = useState(initialSkill);
  const [newQuote, setNewQuote] = useState(initialQuote);
  const [active, setActive] = useState(1);
  const [selected, setSelected] = useState("Statuts de projet");

  const handleCreate = (event) => {
    const { name, value } = event.target;
    if (modalType === "statut") {
      setNewStatus(value);
    }
    if (modalType === "catégorie") {
      setNewCategory(value);
    }
    if (modalType === "catégorie de compétences") {
      setNewSkillCategory(value);
    }
    if (modalType === "compétence") {
      setNewSkill((prev) => ({ ...prev, [name]: value }));
    }
    if (modalType === "citation") {
      setNewQuote((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (modalType === "statut") {
        await connexion.post("/api/status", { newStatus });
      }
      if (modalType === "catégorie") {
        await connexion.post("/api/category", { category: newCategory });
      }
      if (modalType === "catégorie de compétences") {
        await connexion.post("/api/skillCategory", {
          category: newSkillCategory,
        });
      }
      if (modalType === "compétence") {
        await connexion.post("/api/skill", newSkill);
      }
      if (modalType === "citation") {
        await connexion.post("/api/quote", newQuote);
      }
      successToast(`Nouvelle ${modalType} ajoutée avec succès !`);
      setNewCategory("");
      setNewSkillCategory("");
      setNewSkill(initialSkill);
      setNewStatus("");
      setNewQuote(initialQuote);
      setRender(!render);
      closeModal();
    } catch (error) {
      console.error();
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await connexion.get("/api/skill");
      setAllSkills(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchQuotes = async () => {
    try {
      const response = await connexion.get("/api/quote?purpose=all");
      setAllQuotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSkillsCategories = async () => {
    try {
      const response = await connexion.get("/api/skillCategory");
      setAllSkillsCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchStatus();
    fetchSkills();
    fetchQuotes();
    fetchSkillsCategories();
  }, [fetchCategories, fetchStatus, render]);

  const handleDeleteStatus = async (id) => {
    try {
      console.error("hello world", id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>Administration</h2>;
      <section className="admin-selector page-display">
        {sectionArray.map((section) => (
          <ButtonAdmin
            key={section.id}
            title={section.title}
            conditionalCss={section.id}
            active={active}
            setActive={setActive}
            setSelected={setSelected}
          />
        ))}
      </section>
      <AdminSection
        array={allStatus}
        nameKey="status"
        handleDelete={handleDeleteStatus}
        title="Statuts de projet"
        buttonTitle="Ajouter un statut :"
        selected={selected}
        section="statut"
      />
      <AdminSection
        array={allCategories}
        nameKey="category"
        handleDelete={handleDeleteStatus}
        buttonTitle="Ajouter une categorie :"
        title="Catégories de projets"
        selected={selected}
        section="catégorie"
      />
      <AdminSection
        array={allSkills}
        nameKey="name"
        handleDelete={handleDeleteStatus}
        buttonTitle="Ajouter une compétence :"
        title="Compétences utilisateur"
        selected={selected}
        section="compétence"
      />
      <AdminSection
        array={allSkillsCategories}
        nameKey="category"
        handleDelete={handleDeleteStatus}
        buttonTitle="Ajouter une catégorie :"
        title="Catégories de compétences"
        selected={selected}
        section="catégorie de compétences"
      />
      <AdminSection
        array={allQuotes}
        nameKey="quote"
        handleDelete={handleDeleteStatus}
        buttonTitle="Ajouter une citation :"
        title="Citations de développeurs"
        selected={selected}
        section="citation"
        isQuote
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className={modalType === "citation" ? "Modal" : "modal-small"}
        appElement={document.getElementById("root")}
      >
        <h3>{modalTitle}</h3>
        {modalType === "statut" && (
          <InputForm
            handleSubmit={handleSubmit}
            handleModify={handleCreate}
            name="status"
            value={newStatus}
            label="Nouveau statut :"
          />
        )}
        {modalType === "catégorie" && (
          <InputForm
            handleSubmit={handleSubmit}
            handleModify={handleCreate}
            name="category"
            value={newCategory}
            label="Nouvelle catégorie :"
          />
        )}
        {modalType === "catégorie de compétences" && (
          <InputForm
            handleSubmit={handleSubmit}
            handleModify={handleCreate}
            name="category-skill"
            value={newSkillCategory}
            label="Nouvelle catégorie de compétences :"
          />
        )}
        {modalType === "compétence" && (
          <form onSubmit={handleSubmit} className="input-form">
            <label className="normal-text-input">
              Nouvelle compétence :
              <input
                type="text"
                value={newSkill.name}
                name="name"
                onChange={handleCreate}
                required
              />
            </label>
            <label className="large-select">
              Catégorie de la compétence :
              <select
                name="category_id"
                value={newSkillCategory.category_id}
                onChange={handleCreate}
                required
              >
                <option value="">--- Choisissez une catégorie ---</option>
                {allSkillsCategories.map((skillCategory) => (
                  <option key={skillCategory.id} value={skillCategory.id}>
                    {skillCategory.category}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="button">
              Valider
            </button>
          </form>
        )}
        {modalType === "citation" && (
          <form onSubmit={handleSubmit} className="text-area-form">
            <label className="large-text-input">
              Nouvelle citation :
              <textarea
                className="modal-textarea"
                value={newQuote.quote}
                name="quote"
                onChange={handleCreate}
                required
              />
            </label>
            <label className="large-text-input">
              Auteur :
              <input
                type="text"
                name="author"
                value={newQuote.author}
                onChange={handleCreate}
                required
              />
            </label>
            <button type="submit" className="button">
              Valider
            </button>
          </form>
        )}
        <button
          type="button"
          className="button-close-modal"
          onClick={closeModal}
        >
          X
        </button>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Admin;
