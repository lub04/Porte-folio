import { useEffect } from "react";

import ExpandableSection from "../../components/ExpandableSection/ExpandableSection";

import "./Messagerie.css";
import { usePortefolio } from "../../context/PortefolioContext";
import DotsLoader from "../../components/DotsLoader/DotsLoader";

function Messagerie() {
  const { messages, fetchMessages, notReadMessages } = usePortefolio();

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);
  if (!messages) {
    return <DotsLoader />;
  }

  return (
    <>
      <h2>
        Messagerie ({notReadMessages.length}
        {notReadMessages.length > 1 ? " messages non lus" : " message non lu"})
      </h2>

      <div className="page-display box message-list-admin">
        {messages.length > 0 ? (
          messages.map((message) => (
            <ExpandableSection
              key={message.id}
              content={message.message}
              message={message}
              isRead={message.is_read}
            />
          ))
        ) : (
          <h3>Vous n'avez aucun message !</h3>
        )}
      </div>
    </>
  );
}

export default Messagerie;
