import { useState } from "react";

import ValidationModal from "../ValidationModal/ValidationModal";
import successToast from "../Toast/successToast";

import connexion from "../../services/connexion";
import chevronRight from "../../assets/images/icons/chevron-right.svg";
import chevronDown from "../../assets/images/icons/chevron-down.svg";
import trash from "../../assets/images/icons/trash.svg";
import { usePortefolio } from "../../context/PortefolioContext";
import "./ExpandableSection.css";

function ExpandableSection({ title, content, message, isRead }) {
  const { markMessageAsRead, setRender, render } = usePortefolio();
  const [isExpanded, setIsExpanded] = useState(false);
  const [validationDeleteMessageModal, setValidationDeleteMessageModal] =
    useState(false);

  const openValidationDeleteMessageModal = () => {
    setValidationDeleteMessageModal(true);
  };

  const handleDeleteMessage = async (id) => {
    try {
      await connexion.delete(`/api/messages/${id}`);
      setRender(!render);
      successToast("Le message à bien été supprimé !");
    } catch (error) {
      console.error(error);
    }
  };
  const toggleExpand = async () => {
    setIsExpanded(!isExpanded);
    if (message && !message.is_read) {
      await markMessageAsRead(message.id);
    }
  };

  return (
    <>
      <article className={isExpanded ? "deployed" : ""}>
        <button
          type="button"
          className={`no-button roll-organisation ${isExpanded ? "deploy" : "not-deploy"} ${isRead ? "" : "message-not-read"}`}
          onClick={toggleExpand}
        >
          {message ? (
            <>
              <h3>{`${message.user_last_name} ${message.user_first_name}`}</h3>
              <p>{message.user_email}</p>
              <small>{message.created_at}</small>
            </>
          ) : (
            <h3>{title}</h3>
          )}
          <img src={isExpanded ? chevronRight : chevronDown} alt="" />
        </button>
        {isExpanded && (
          <p className="message-content" style={{ whiteSpace: "pre-line" }}>
            {content}{" "}
            {message && (
              <button
                type="button"
                className="button button-delete-admin-message"
                title="Supprimer le message"
                onClick={openValidationDeleteMessageModal}
              >
                <img src={trash} alt="supprimer" />
              </button>
            )}
          </p>
        )}
      </article>

      <ValidationModal
        text1="Êtes-vous sûre de vouloir supprimmer ce message ?"
        validationModalIsOpen={validationDeleteMessageModal}
        setValidationModalIsOpen={setValidationDeleteMessageModal}
        handleDelete={handleDeleteMessage}
        id={message.id}
      />
    </>
  );
}

export default ExpandableSection;
