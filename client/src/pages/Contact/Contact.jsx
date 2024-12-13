import { useState } from "react";
import { ToastContainer } from "react-toastify";

import successToast from "../../components/Toast/successToast";
import errorToast from "../../components/Toast/errorToast";
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
  const [cssForm, setCssForm] = useState("");
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
      setCssForm("");
      setMessage(initialMessage);
      successToast("Votre message à bien été envoyé");
    } catch (error) {
      setCssForm("errorForm");
      errorToast(
        "Votre message n'a pas pus être envoyer verifiez vos informations pui réessayez !"
      );
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
            className={cssForm}
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
            className={cssForm}
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
            className={cssForm}
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
            className={`${cssForm} message`}
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
