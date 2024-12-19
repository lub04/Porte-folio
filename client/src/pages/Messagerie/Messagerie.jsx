import { useLoaderData } from "react-router-dom";
import "./Messagerie.css";
import ExpandableSection from "../../components/ExpandableSection/ExpandableSection";

function Messagerie() {
  const messages = useLoaderData();
  const notReadMessages = messages.filter((message) => message.is_read === 0);

  return (
    <>
      <h2>
        Messagerie ({notReadMessages.length}
        {notReadMessages.length > 1 ? " messages non lus" : " message non lu"})
      </h2>
      <div className="page-display box">
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
