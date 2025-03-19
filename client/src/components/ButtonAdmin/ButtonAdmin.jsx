import "./ButtonAdmin.css";

function ButtonAdmin({
  title,
  conditionalCss,
  active,
  setActive,
  setSelected,
}) {
  const handleClick = (id) => {
    setSelected(title);
    setActive(id);
  };

  return (
    <button
      type="button"
      className={`admin-button ${conditionalCss === active && "active"}`}
      onClick={() => handleClick(conditionalCss)}
    >
      {title}
    </button>
  );
}

export default ButtonAdmin;
