import { usePortefolio } from "../../context/PortefolioContext";
import ButtonDelete from "../ButtonDelete/ButtonDelete";

import "./AdminSection.css";

function AdminSection({
  array,
  nameKey,
  handleDelete,
  title,
  isQuote,
  section,
  buttonTitle,
}) {
  const { openModal } = usePortefolio();

  return (
    <section className="page-display box admin-box">
      <h3>{title}</h3>
      <article className="admin-section">
        {array.map((element) => (
          <ButtonDelete
            key={element.id}
            id={element.id}
            name={
              isQuote
                ? `${element[nameKey]} (${element.author})`
                : element[nameKey]
            }
            handleDelete={handleDelete}
          />
        ))}
      </article>
      <button
        type="button"
        className="button"
        onClick={() => openModal(buttonTitle, section)}
      >
        Ajouter {section === "statut" ? `un ${section} +` : `une ${section} +`}
      </button>
    </section>
  );
}

export default AdminSection;
