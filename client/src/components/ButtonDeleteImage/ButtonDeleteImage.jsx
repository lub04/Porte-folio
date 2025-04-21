import "./ButtonDeleteImage.css";

function ButtonDeleteImage({ handleDelete, id, url, index }) {
  return (
    <button
      className="no-button button-image"
      type="button"
      onClick={() => handleDelete(id)}
      title="Supprimer l'image"
    >
      <img
        src={`${import.meta.env.VITE_API_URL}/${url}`}
        alt={`Exemple du projet ${index + 1}`}
      />
      <div className="delete-hover">X</div>
    </button>
  );
}

export default ButtonDeleteImage;
