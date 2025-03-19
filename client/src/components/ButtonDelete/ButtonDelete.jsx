import { useState } from "react";
import ValidationModal from "../ValidationModal/ValidationModal";

import "./ButtonDelete.css";

function ButtonDelete({ id, handleDelete, name }) {
  const [validationDeleteIsOpen, setValidationDeleteIsOpen] = useState(false);
  return (
    <>
      <button
        title="Supprimer"
        className="delete-button"
        type="button"
        onClick={() => setValidationDeleteIsOpen(true)}
      >
        {name} x
      </button>
      <ValidationModal
        handleDelete={handleDelete}
        id={id}
        validationModalIsOpen={validationDeleteIsOpen}
        setValidationModalIsOpen={setValidationDeleteIsOpen}
        reinitializeState={null}
        closeModal={null}
        text1={`Êtes vous sure de vouloir supprimer "${name}" de la liste`}
        text2="Toute suppression de la base de donées est définitive !"
      />
    </>
  );
}

export default ButtonDelete;
