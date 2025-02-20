import "./ImageForm.css";

function ImageForm({
  stepChecked,
  step,
  handleSubmit,
  handleFileChange,
  label,
}) {
  if (stepChecked !== step) return null;

  return (
    <form onSubmit={handleSubmit}>
      <label className="large-text-input">
        {label}
        <input required type="file" onChange={handleFileChange} />
      </label>
      <button type="submit" className="button">
        Prochaine étape
      </button>
    </form>
  );
}

export default ImageForm;
