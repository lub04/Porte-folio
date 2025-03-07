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
  isLogoChoosen,
  goToNextStep,
  isMainPictureChoosen,
  setFileName,
  fileName,
}) {
  if (stepChecked !== step) return null;
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  const formImage = () => {
    if (isLogoChoosen && stepChecked === 2) {
      return (
        <button type="button" className="button" onClick={goToNextStep}>
          Prochaine étape
        </button>
      );
    }
    if (isMainPictureChoosen && stepChecked === 3) {
      return (
        <button type="button" className="button" onClick={goToNextStep}>
          Prochaine étape
        </button>
      );
    }
    return (
      <form onSubmit={handleSubmit} className="image-form">
        <label className="upload-input">
          {label}
          <input
            required
            type="file"
            ref={inputRef}
            aria-hidden="true"
            onChange={handleFileChange}
          />
          <span className="file-name">
            {fileName || "Aucun fichier sélectionné"}
          </span>
        </label>
        <button type="submit" className="button">
          {stepChecked !== 4 && stepChecked !== 5
            ? "Prochaine étape"
            : "Ajouter !"}
        </button>
      </form>
    );
  };
  return (
    <>
      <ContentFormModal
        stepChecked={stepChecked}
        projectId={projectId}
        render={render}
      />
      {formImage()}
    </>
  );
}

export default ImageForm;
