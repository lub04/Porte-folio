import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import ExpandableSection from "../../components/ExpandableSection/ExpandableSection";
import DotsLoader from "../../components/DotsLoader/DotsLoader";

import { usePortefolio } from "../../context/PortefolioContext";
import "./Messagerie.css";

function Messagerie() {
  const { messages, fetchMessages, notReadMessages, render } = usePortefolio();

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages, render]);
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
      <ToastContainer />
    </>
  );
}

export default Messagerie;
