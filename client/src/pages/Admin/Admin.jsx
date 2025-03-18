import { useEffect, useState } from "react";
import Modal from "react-modal";

import AdminSection from "../../components/AdminSection/AdminSection";
import InputForm from "../../components/InputForm/InputForm";

import connexion from "../../services/connexion";
import { usePortefolio } from "../../context/PortefolioContext";
import "./Admin.css";

const initialQuote = {
  quote: "",
  author: "",
};

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
  const [status, setStatus] = useState("");
  const [categories, setCategories] = useState("");
  const [skill, setSkill] = useState("");
  const [quote, setQuote] = useState(initialQuote);

  const handleCreate = (event) => {
    const { name, value } = event.target;
    if (modalType === "statut") {
      setStatus(value);
    }
    if (modalType === "catégorie") {
      setCategories(value);
    }
    if (modalType === "compétence") {
      setSkill(value);
    }
    if (modalType === "citation") {
      setQuote((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (modalType === "statut") {
        await connexion.post("/api/status", { status });
      }
      if (modalType === "catégorie") {
        await connexion.post("/api/category", { category: categories });
      }
      if (modalType === "compétence") {
        await connexion.post("/api/skill", { name: skill });
      }
      if (modalType === "citation") {
        await connexion.post("/api/quote", quote);
      }
      setCategories("");
      setSkill("");
      setStatus("");
      setQuote(initialQuote);
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

  useEffect(() => {
    fetchCategories();
    fetchStatus();
    fetchSkills();
    fetchQuotes();
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
      <h2>back-office</h2>;
      <AdminSection
        array={allStatus}
        nameKey="status"
        handleDelete={handleDeleteStatus}
        title="Status de projet :"
        buttonTitle="Ajouter un statut :"
        section="statut"
      />
      <AdminSection
        array={allCategories}
        nameKey="category"
        handleDelete={handleDeleteStatus}
        buttonTitle="Ajouter une categorie :"
        title="Catégories de projet :"
        section="catégorie"
      />
      <AdminSection
        array={allSkills}
        nameKey="name"
        handleDelete={handleDeleteStatus}
        buttonTitle="Ajouter une compétence :"
        title="Compétences utilisateur :"
        section="compétence"
      />
      <AdminSection
        array={allQuotes}
        nameKey="quote"
        handleDelete={handleDeleteStatus}
        buttonTitle="Ajouter une citation"
        title="Citations de dev :"
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
            value={status}
            label="Nouveau statut :"
          />
        )}
        {modalType === "catégorie" && (
          <InputForm
            handleSubmit={handleSubmit}
            handleModify={handleCreate}
            name="category"
            value={categories}
            label="Nouvelle catégorie :"
          />
        )}
        {modalType === "compétence" && (
          <InputForm
            handleSubmit={handleSubmit}
            handleModify={handleCreate}
            name="skill"
            value={skill}
            label="Nouvelle compétence :"
          />
        )}
        {modalType === "citation" && (
          <form onSubmit={handleSubmit} className="text-area-form">
            <label className="large-text-input">
              Nouvelle citation :
              <textarea
                className="modal-textarea"
                value={quote.quote}
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
                value={quote.author}
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
    </>
  );
}

export default Admin;
