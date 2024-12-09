import "./Contact.css";

function Contact() {
  return (
    <div className="page-display-form">
      <h2>Contactez moi !</h2>
      <form className="contact-form box">
        <label className="user-name">
          Nom :
          <input type="text" />
        </label>
        <label className="user-name">
          Prénom :
          <input type="text" />
        </label>
        <label className="user-mail">
          Email :
          <input type="mail" />
        </label>
        <label className="user-message">
          Message :
          <textarea className="message" />
        </label>
        <button className="button" type="submit">
          Envoyer !
        </button>
      </form>
    </div>
  );
}

export default Contact;
