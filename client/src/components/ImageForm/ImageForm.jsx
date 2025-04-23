import ContentFormModal from "../ContentFormModal/ContentFormModal";

import { usePortefolio } from "../../context/PortefolioContext";
import "./ImageForm.css";

function ImageForm({
  stepChecked,
  step,
  handleSubmit,
  label,
  inputRef,
  projectId,
  isLogoChoosen,
  isMainPictureChoosen,
  handleSubmitModifyPicture,
  isProject,
  avatar,
}) {
  const { fileName, setFileName } = usePortefolio();
  if (isProject) {
    if (stepChecked !== step) return null;
  }
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  const isModificationMode =
    (isLogoChoosen && stepChecked === 2) ||
    (isMainPictureChoosen && stepChecked === 3);

  const formImage = () => (
    <form
      onSubmit={isModificationMode ? handleSubmitModifyPicture : handleSubmit}
      className="image-form"
    >
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
        {isModificationMode ? "Modifier" : "Ajouter"}
      </button>
    </form>
  );
  return (
    <>
      <ContentFormModal
        stepChecked={stepChecked}
        projectId={projectId}
        isProject={isProject}
        avatar={avatar}
      />
      {formImage()}
    </>
  );
}

export default ImageForm;
