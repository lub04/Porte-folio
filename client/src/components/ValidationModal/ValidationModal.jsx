import Modal from "react-modal";
import "./ValidationModal.css";
import { usePortefolio } from "../../context/PortefolioContext";

function ValidationModal({
  validationModalIsOpen,
  setValidationModalIsOpen,
  id,
  reinitializeState,
  closeModal,
  text1,
  text2,
}) {
  const { handleDeleteProject, setRender, render } = usePortefolio();
  const closeValidationModal = () => {
    setValidationModalIsOpen(false);
  };
  const handleValidate = async () => {
    if (reinitializeState) {
      reinitializeState();
    }
    await handleDeleteProject(id);
    closeValidationModal();
    if (closeModal) {
      closeModal();
    }
    setRender(!render);
  };
  return (
    <Modal
      isOpen={validationModalIsOpen}
      onRequestClose={closeValidationModal}
      contentLabel="Validation Modal"
      className="validation-modal"
      appElement={document.getElementById("root")}
    >
      <p>{text1}</p>
      <p>{text2}</p>
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
