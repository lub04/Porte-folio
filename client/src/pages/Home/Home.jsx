import { useLoaderData, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

import connexion from "../../services/connexion";
import { usePortefolio } from "../../context/PortefolioContext";
import "./Home.css";
import successToast from "../../components/Toast/successToast";
import errorToast from "../../components/Toast/errorToast";

function Home() {
  const home = useLoaderData();
  const { logUser } = usePortefolio();
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [welcome, setWelcome] = useState(home.welcome);
  const openModalWelcome = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleModifyWelcome = (event) => {
    const { value } = event.target;
    setWelcome(value);
  };
  const handleSubmitModifyWelcome = async (event) => {
    event.preventDefault();
    try {
      await connexion.put("api/home/1?selector=welcome", { welcome });
      navigate(".", { replace: true });
      successToast("Modification réalisée avec succès !");
      closeModal();
    } catch (error) {
      errorToast(
        "Une erreur est survenue lors de la modification du message de bienvenue !"
      );
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="title-home">Entrez dans mon univers ...</h2>
      <section className="home-welcome page-display">
        {logUser ? (
          <article className="box welcome">
            <p className="welcome-admin">{home.welcome}</p>
            <button type="button" className="button" onClick={openModalWelcome}>
              Modifier le texte
            </button>
          </article>
        ) : (
          <p className="welcome box">{home.welcome}</p>
        )}
        <article className="presentation">
          <img
            src={`${import.meta.env.VITE_API_URL}/${home.img}`}
            alt="avatar de Lubin page d'accueil"
          />
          <p style={{ whiteSpace: "pre-line" }}>{home.presentation}</p>
        </article>
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="Modal"
      >
        <form onSubmit={handleSubmitModifyWelcome}>
          <label htmlFor="">
            Texte de bienvenue
            <textarea
              className="modal-textarea"
              value={welcome}
              name="welcome"
              onChange={handleModifyWelcome}
              required
            />
          </label>
          <button type="submit" className="button">
            Valider
          </button>
        </form>
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

export default Home;
