import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";

import ProjectCard from "../../components/ProjectCard/ProjectCard";

import { usePortefolio } from "../../context/PortefolioContext";
import connexion from "../../services/connexion";
import successToast from "../../components/Toast/successToast";
import "./AllProjects.css";
import ImageForm from "../../components/ImageForm/ImageForm";
import FormProject from "../../components/FormProject/FormProject";
import SkillForm from "../../components/SkillForm/SkillForm";
import ContentFormModal from "../../components/ContentFormModal/ContentFormModal";
import ValidationModal from "../../components/ValidationModal/ValidationModal";
import errorToast from "../../components/Toast/errorToast";

const stepUi = [1, 2, 3, 4, 5, 6];

function AllProjects() {
  const {
    logUser,
    newProject,
    setNewProject,
    handleModifyProject,
    initialProject,
  } = usePortefolio();
  const inputRefLogo = useRef();
  const inputRefMainImage = useRef();
  const inputRefScreenshots = useRef();
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [validationModalIsOpen, setValidationModalIsOpen] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isLogoChoosen, setIsLogoChoosen] = useState(false);
  const [isMainPictureChoosen, setIsMainPictureChoosen] = useState(false);
  const [stepChecked, setStepChecked] = useState(1);
  const [idNewProject, setIdNewProject] = useState(null);
  const [render, setRender] = useState(false);
  const [fileName, setFileName] = useState("");
  const [projectsList, setProjectsList] = useState([]);
  const [success, setSuccess] = useState(true);

  const reinitializeState = () => {
    setIsCreated(false);
    setIdNewProject(null);
    setIsLogoChoosen(false);
    setIsMainPictureChoosen(false);
    setNewProject(initialProject);
    setStepChecked(1);
    setSuccess(true);
  };

  const fetchProject = async () => {
    const response = await connexion.get("/api/projects");
    setProjectsList(response.data);
  };

  useEffect(() => {
    fetchProject();
  }, [render]);

  const [projectSkill, setProjectSkill] = useState({
    project_id: idNewProject,
    skill_id: null,
  });
  const openValidationModal = () => {
    setValidationModalIsOpen(true);
  };

  const openModalAddProject = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setNewProject(initialProject);
    setModalIsOpen(false);
  };

  const goToNextStep = () => {
    setStepChecked(stepChecked + 1);
  };

  const goToPrevStep = (e) => {
    e.preventDefault();
    setStepChecked(stepChecked - 1);
  };

  const handleSubmitProject = async () => {
    try {
      const response = await connexion.post("/api/projects", newProject);
      setSuccess(true);
      setIsCreated(true);
      const projectId = response.data.insertId;
      setIdNewProject(projectId);
      successToast("Votre projet à bien été créé !");
    } catch (error) {
      setSuccess(false);
      console.error("Erreur lors de la création du projet :", error);
      errorToast("Il y a eu une erreur lors de la création du projet !");
    }
  };
  const handleProject = async (event) => {
    event.preventDefault();
    if (!isCreated) {
      handleSubmitProject();
      await fetchProject();
      setRender(!render);
      if (success) {
        goToNextStep();
      }
    } else {
      handleModifyProject(idNewProject);
      await fetchProject();
      setRender(!render);
      if (success) {
        goToNextStep();
      }
    }
  };

  const handleSubmitImage = async (event) => {
    event.preventDefault();

    if (stepChecked === 2) {
      if (!isLogoChoosen) {
        try {
          const formData = new FormData();
          formData.append("image", inputRefLogo.current.files[0]);
          formData.append("project_id", idNewProject);
          formData.append("type", "logo");
          await connexion.post(`/api/image`, formData);
          setIsLogoChoosen(true);
          goToNextStep();
          navigate(".", { replace: true });
        } catch (error) {
          console.error(error);
        }
      }
      setFileName("");
      goToNextStep();
    }
    if (stepChecked === 3) {
      if (!isMainPictureChoosen) {
        try {
          const formData = new FormData();
          formData.append("image", inputRefMainImage.current.files[0]);
          formData.append("project_id", idNewProject);
          formData.append("type", "main");
          await connexion.post(`/api/image`, formData);
          setIsMainPictureChoosen(true);
          goToNextStep();
          navigate(".", { replace: true });
        } catch (error) {
          console.error(error);
        }
      }
      setFileName("");
      goToNextStep();
    }
    if (stepChecked === 4) {
      try {
        const formData = new FormData();
        formData.append("image", inputRefScreenshots.current.files[0]);
        formData.append("project_id", idNewProject);
        formData.append("type", "screenshot");
        await connexion.post(`/api/image`, formData);
        setRender(!render);
        setFileName("");
        navigate(".", { replace: true });
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleSubmitModifyPicture = async (event) => {
    event.preventDefault();
    if (stepChecked === 2) {
      if (isLogoChoosen) {
        try {
          const formData = new FormData();
          formData.append("image", inputRefLogo.current.files[0]);
          await connexion.put(`/api/image/${idNewProject}?type=logo`, formData);
          setRender(!render);
          setFileName("");
          navigate(".", { replace: true });
          goToNextStep();
        } catch (error) {
          console.error(error);
        }
      }
    }
    if (stepChecked === 3) {
      if (isMainPictureChoosen) {
        try {
          const formData = new FormData();
          formData.append("image", inputRefMainImage.current.files[0]);
          await connexion.put(`/api/image/${idNewProject}?type=main`, formData);
          setRender(!render);
          setFileName("");
          navigate(".", { replace: true });
          goToNextStep();
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const handleSubmitSkill = async (event) => {
    event.preventDefault();
    try {
      await connexion.post("api/projectSkill", projectSkill);
      setRender(!render);
      navigate(".", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const titleModal = () => {
    if (stepChecked === 1) {
      return (
        <h3 className="modal-title">
          {!isCreated ? "Créer un projet :" : "Modifier le projet :"}
        </h3>
      );
    }
    if (stepChecked === 2) {
      return (
        <h3 className="modal-title">
          {!isLogoChoosen ? "Ajouter un logo :" : "Modifier le logo :"}
        </h3>
      );
    }
    if (stepChecked === 3) {
      return (
        <h3 className="modal-title">
          {!isMainPictureChoosen
            ? "Ajouter une image principale :"
            : "Modifier l'image principale :"}
        </h3>
      );
    }
    if (stepChecked === 4) {
      return (
        <h3 className="modal-title">Ajouter ou supprimer des screenshots :</h3>
      );
    }
    if (stepChecked === 5) {
      return (
        <h3 className="modal-title">Ajouter ou supprimer des compétences :</h3>
      );
    }
    return <h3 className="modal-title">Récapitulatif de mon projet :</h3>;
  };

  const handleValidateProject = () => {
    successToast(
      `Votre nouveau projet '${newProject.name}' à bien été ajouté à la base de données`
    );
    reinitializeState();
    closeModal();
  };

  return (
    <>
      <h2>Mes projets</h2>
      {logUser ? (
        <button className="button" type="button" onClick={openModalAddProject}>
          Ajouter un projet
        </button>
      ) : null}
      <section className="page-display projects-list">
        {projectsList.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={isCreated ? openValidationModal : closeModal}
        contentLabel="Image Modal"
        className="Modal"
      >
        <section className="step-ui">
          {stepUi.map((onestep) => (
            <div
              key={onestep}
              className={
                onestep === stepChecked
                  ? "full-step-ui step-ui-border"
                  : "step-ui-border"
              }
            />
          ))}
        </section>
        {stepChecked !== 1 && (
          <button type="button" className="button" onClick={goToPrevStep}>
            Retour
          </button>
        )}

        {titleModal()}
        <FormProject
          handleSubmitProject={handleProject}
          stepChecked={stepChecked}
          step={1}
          newProject={newProject}
          setNewProject={setNewProject}
          isCreated={isCreated}
        />
        <ImageForm
          stepChecked={stepChecked}
          step={2}
          handleSubmit={handleSubmitImage}
          inputRef={inputRefLogo}
          label={!isLogoChoosen ? "Ajoutez un logo !" : "Modifiez le logo !"}
          projectId={idNewProject}
          render={null}
          isLogoChoosen={isLogoChoosen}
          isMainPictureChoosen={isMainPictureChoosen}
          setFileName={setFileName}
          fileName={fileName}
          handleSubmitModifyPicture={handleSubmitModifyPicture}
          setRender={setRender}
        />
        <ImageForm
          stepChecked={stepChecked}
          step={3}
          handleSubmit={handleSubmitImage}
          inputRef={inputRefMainImage}
          label={
            !isMainPictureChoosen
              ? "Ajoutez l'image principale du projet !"
              : "Modifiez l'image principale du projet !"
          }
          projectId={idNewProject}
          render={null}
          isLogoChoosen={isLogoChoosen}
          isMainPictureChoosen={isMainPictureChoosen}
          setFileName={setFileName}
          fileName={fileName}
          handleSubmitModifyPicture={handleSubmitModifyPicture}
          setRender={setRender}
        />
        <ImageForm
          stepChecked={stepChecked}
          step={4}
          handleSubmit={handleSubmitImage}
          inputRef={inputRefScreenshots}
          label="Screenshots !"
          projectId={idNewProject}
          render={render}
          setFileName={setFileName}
          fileName={fileName}
          setRender={setRender}
        />
        <SkillForm
          stepChecked={stepChecked}
          step={5}
          projectId={idNewProject}
          handleSubmit={handleSubmitSkill}
          setProjectSkill={setProjectSkill}
          render={render}
          setRender={setRender}
        />

        {stepChecked === 4 && (
          <button type="button" className="button" onClick={goToNextStep}>
            Prochaine étape
          </button>
        )}
        {stepChecked === 5 && (
          <button type="button" className="button" onClick={goToNextStep}>
            Validez et fermez !
          </button>
        )}
        {stepChecked === 6 && (
          <section>
            <ContentFormModal
              stepChecked={stepChecked}
              projectId={idNewProject}
              render={render}
              setRender={setRender}
            />
            <button
              type="button"
              className="button"
              onClick={handleValidateProject}
            >
              Validez et fermez !
            </button>
          </section>
        )}
        <button
          type="button"
          className="button-close-modal"
          onClick={isCreated ? openValidationModal : closeModal}
        >
          X
        </button>
      </Modal>
      <ValidationModal
        validationModalIsOpen={validationModalIsOpen}
        setValidationModalIsOpen={setValidationModalIsOpen}
        id={idNewProject}
        reinitializeState={reinitializeState}
        closeModal={closeModal}
        fetchProject={fetchProject}
        setRender={setRender}
        render={render}
      />
      <ToastContainer />
    </>
  );
}

export default AllProjects;
