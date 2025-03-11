import Modal from "react-modal";
import "./ValidationModal.css";
import { usePortefolio } from "../../context/PortefolioContext";

function ValidationModal({
  validationModalIsOpen,
  setValidationModalIsOpen,
  id,
  reinitializeState,
  closeModal,
  setRender,
  render,
}) {
  const { handleDeleteProject } = usePortefolio();
  const closeValidationModal = () => {
    setValidationModalIsOpen(false);
  };
  const handleValidate = async () => {
    reinitializeState();
    await handleDeleteProject(id);
    closeValidationModal();
    closeModal();
    setRender(!render);
  };
  return (
    <Modal
      isOpen={validationModalIsOpen}
      onRequestClose={closeValidationModal}
      contentLabel="Validation Modal"
      className="validation-modal"
    >
      <p>Êtes-vous sûre de vouloir quitter ?</p>
      <p>Attention, les données ne seront pas sauvegardées !</p>
      <article>
        <button type="button" className="button" onClick={handleValidate}>
          Oui
        </button>
        <button type="button" className="button" onClick={closeValidationModal}>
          Non
        </button>
      </article>
    </Modal>
  );
}

export default ValidationModal;
