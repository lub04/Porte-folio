import ContentFormModal from "../ContentFormModal/ContentFormModal";
import "./ImageForm.css";

function ImageForm({
  stepChecked,
  step,
  handleSubmit,
  label,
  inputRef,
  projectId,
  render,
}) {
  if (stepChecked !== step) return null;

  return (
    <>
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
      <ContentFormModal
        stepChecked={stepChecked}
        projectId={projectId}
        render={render}
      />
    </>
  );
}

export default ImageForm;
