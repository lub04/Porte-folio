import { useEffect, useState } from "react";

import ExpandableSection from "../../components/ExpandableSection/ExpandableSection";

import connexion from "../../services/connexion";
import "./Messagerie.css";

function Messagerie() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await connexion.get("/api/messages");
      setMessages(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

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
