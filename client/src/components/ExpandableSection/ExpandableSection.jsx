import { useState } from "react";

import chevronRight from "../../assets/images/icons/chevron-right.svg";
import chevronDown from "../../assets/images/icons/chevron-down.svg";
import "./ExpandableSection.css";
import { usePortefolio } from "../../context/PortefolioContext";

function ExpandableSection({ title, content, message, isRead }) {
  const { markMessageAsRead } = usePortefolio();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = async () => {
    setIsExpanded(!isExpanded);
    if (message && !message.is_read) {
      await markMessageAsRead(message.id);
    }
  };

  return (
    <article className={isExpanded ? "deployed" : ""}>
      <button
        type="button"
        className={`no-button roll-organisation ${isExpanded ? "deploy" : "not-deploy"} ${isRead ? "" : "message-not-read"}`}
        onClick={toggleExpand}
      >
        {message ? (
          <>
            <h3>{`${message.user_last_name} ${message.user_first_name}`}</h3>
            <p>{message.user_email}</p>
            <small>{message.created_at}</small>
          </>
        ) : (
          <h3>{title}</h3>
        )}
        <img src={isExpanded ? chevronRight : chevronDown} alt="" />
      </button>
      {isExpanded && <p style={{ whiteSpace: "pre-line" }}>{content}</p>}
    </article>
  );
}

export default ExpandableSection;
