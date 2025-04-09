import { usePortefolio } from "../../context/PortefolioContext";
import connexion from "../../services/connexion";
import errorToast from "../Toast/errorToast";
import successToast from "../Toast/successToast";
import "./ModifyUserForm.css";

function ModifyUserForm({ user, setUser, closeModifyUserModal }) {
  const { setRender, render } = usePortefolio();

  const handleSubmitUser = async (event) => {
    event.preventDefault();
    try {
      await connexion.put("/api/user/1?selector=user-informations", user);
      setRender(!render);
      closeModifyUserModal();
      successToast("Vous avez modifié votre profil !");
    } catch (error) {
      errorToast(
        "Il y a eu un problème avec la modification de votre profil !"
      );
      console.error(error);
    }
  };

  const handleModifyUser = (event) => {
    const { name, value } = event.target;
    setUser((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmitUser}>
      <label className="normal-text-input">
        Nom :
        <input
          type="text"
          value={user.last_name}
          name="last_name"
          onChange={handleModifyUser}
        />
      </label>
      <label className="normal-text-input">
        Prénom :
        <input
          type="text"
          value={user.first_name}
          name="first_name "
          onChange={handleModifyUser}
        />
      </label>
      <label className="normal-text-input">
        Téléphone :
        <input
          type="text"
          value={user.phone}
          name="phone"
          onChange={handleModifyUser}
        />
      </label>
      <label className="normal-text-input">
        Email :
        <input
          type="text"
          value={user.email}
          name="email"
          onChange={handleModifyUser}
        />
      </label>
      <label className="normal-text-input">
        Github :
        <input
          type="text"
          value={user.github}
          name="github"
          onChange={handleModifyUser}
        />
      </label>
      <label className="normal-text-input">
        Linkedin :
        <input
          type="text"
          value={user.linkedin}
          name="linkedin"
          onChange={handleModifyUser}
        />
      </label>
      <label className="large-text-input">
        Description :
        <textarea
          value={user.description}
          name="description"
          onChange={handleModifyUser}
        />
      </label>
      <button type="submit" className="button">
        Valider
      </button>
    </form>
  );
}

export default ModifyUserForm;
