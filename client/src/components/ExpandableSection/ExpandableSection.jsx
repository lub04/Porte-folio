import { useState } from "react";

import chevronRight from "../../assets/images/icons/chevron-right.svg";
import chevronDown from "../../assets/images/icons/chevron-down.svg";
import "./ExpandableSection.css";

function ExpandableSection({ title, content }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <article className={isExpanded ? "deployed" : ""}>
      <button
        type="button"
        className={`no-button roll-organisation ${isExpanded ? "deploy" : "not-deploy"}`}
        onClick={toggleExpand}
      >
        <h3>{title}</h3>
        <img src={isExpanded ? chevronRight : chevronDown} alt="" />
      </button>
      {isExpanded && <p style={{ whiteSpace: "pre-line" }}>{content}</p>}
    </article>
  );
}

export default ExpandableSection;
