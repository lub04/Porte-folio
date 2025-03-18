import "./ButtonDelete.css";

function ButtonDelete({ id, handleDelete, name }) {
  return (
    <button
      className="delete-button"
      type="button"
      onClick={() => handleDelete(id)}
    >
      {name} x
    </button>
  );
}

export default ButtonDelete;
