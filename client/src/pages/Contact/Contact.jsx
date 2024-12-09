import { useState } from "react";
import { ToastContainer } from "react-toastify";

import successToast from "../../components/Toast/successToas";
import connexion from "../../services/connexion";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";

const initialMessage = {
  user_last_name: "",
  user_first_name: "",
  user_email: "",
  message: "",
};

function Contact() {
  const [message, setMessage] = useState(initialMessage);

  const handleCreateMessage = (event) => {
    const { name, value } = event.target;
    setMessage((prevMessage) => ({
      ...prevMessage,
      [name]: value,
    }));
  };
  const handleSubmitMessage = async (event) => {
    event.preventDefault();
    try {
      await connexion.post(`/api/messages`, message);
      setMessage(initialMessage);
      successToast("Votre message à bien été envoyé");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="page-display-form">
      <h2>Contactez moi !</h2>
      <form className="contact-form box" onSubmit={handleSubmitMessage}>
        <label className="user-name">
          Nom :
          <input
            type="text"
            name="user_last_name"
            onChange={handleCreateMessage}
            value={message.user_last_name}
            required
          />
        </label>
        <label className="user-name">
          Prénom :
          <input
            type="text"
            name="user_first_name"
            onChange={handleCreateMessage}
            value={message.user_first_name}
            required
          />
        </label>
        <label className="user-mail">
          Email :
          <input
            type="email"
            name="user_email"
            onChange={handleCreateMessage}
            value={message.user_email}
            required
          />
        </label>
        <label className="user-message">
          Message :
          <textarea
            className="message"
            name="message"
            onChange={handleCreateMessage}
            value={message.message}
            required
          />
        </label>
        <button className="button" type="submit">
          Envoyer !
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Contact;
