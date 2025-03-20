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

  const formImage = () => {
    if (isLogoChoosen && stepChecked === 2) {
      return (
        <form onSubmit={handleSubmitModifyPicture} className="image-form">
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
            Modifier le logo
          </button>
        </form>
      );
    }
    if (isMainPictureChoosen && stepChecked === 3) {
      return (
        <form onSubmit={handleSubmitModifyPicture} className="image-form">
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
            Modifier l'mage principale'
          </button>
        </form>
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
          {typeof stepChecked === "number" &&
          stepChecked !== 4 &&
          stepChecked !== 5
            ? "Prochaine étape"
            : "Valider !"}
        </button>
      </form>
    );
  };
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
