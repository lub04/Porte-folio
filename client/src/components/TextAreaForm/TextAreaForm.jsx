import "./TextAreaForm.css";

function TextAreaForm({ handleSubmit, handleModify, name, value }) {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Texte de bienvenue
        <textarea
          className="modal-textarea"
          value={value}
          name={name}
          onChange={handleModify}
          required
        />
      </label>
      <button type="submit" className="button">
        Valider
      </button>
    </form>
  );
}

export default TextAreaForm;
