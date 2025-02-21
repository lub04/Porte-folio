import "./ImageForm.css";

function ImageForm({ stepChecked, step, handleSubmit, label, inputRef }) {
  if (stepChecked !== step) return null;

  return (
    <form onSubmit={handleSubmit}>
      <label className="large-text-input">
        {label}
        <input required type="file" ref={inputRef} />
      </label>
      <button type="submit" className="button">
        {stepChecked !== 4 && stepChecked !== 5
          ? "Prochaine étape"
          : "Ajouter !"}
      </button>
    </form>
  );
}

export default ImageForm;
