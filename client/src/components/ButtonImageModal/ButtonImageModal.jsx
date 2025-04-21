import "./ButtonImageModal.css";

function ButtonImageModal({ modalIsOpen, openModalImage, url }) {
  return (
    <button
      className={modalIsOpen ? "no-hover" : "button-example-img"}
      type="button"
      onClick={() => openModalImage(`${import.meta.env.VITE_API_URL}/${url}`)}
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          openModalImage(`${import.meta.env.VITE_API_URL}/${url}`);
        }
      }}
    >
      <img
        src={`${import.meta.env.VITE_API_URL}/${url}`}
        alt="exemple du site 2"
      />
    </button>
  );
}

export default ButtonImageModal;
