import "./TextAreaForm.css";

function TextAreaForm({ handleSubmit, handleModify, name, value, label }) {
  return (
    <form onSubmit={handleSubmit} className="">
      <label className="large-text-input">
        {label}
        <textarea value={value} name={name} onChange={handleModify} required />
      </label>
      <button type="submit" className="button">
        Valider
      </button>
    </form>
  );
}

export default TextAreaForm;
