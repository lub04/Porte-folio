import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";

import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ImageForm from "../../components/ImageForm/ImageForm";
import FormProject from "../../components/FormProject/FormProject";
import SkillForm from "../../components/SkillForm/SkillForm";
import ContentFormModal from "../../components/ContentFormModal/ContentFormModal";
import ValidationModal from "../../components/ValidationModal/ValidationModal";
import errorToast from "../../components/Toast/errorToast";
import successToast from "../../components/Toast/successToast";

import { usePortefolio } from "../../context/PortefolioContext";
import connexion from "../../services/connexion";
import "./AllProjects.css";

const stepUi = [1, 2, 3, 4, 5, 6];

function AllProjects() {
  const {
    logUser,
    newProject,
    setNewProject,
    handleModifyProject,
    initialProject,
    render,
    setRender,
    fetchProject,
    projectsList,
    setFileName,
    handleDeleteProject,
    uploadProjectImage,
    uploadModifyProjectImage,
  } = usePortefolio();
  const inputRefLogo = useRef();
  const inputRefMainImage = useRef();
  const inputRefScreenshots = useRef();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [validationModalIsOpen, setValidationModalIsOpen] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isLogoChoosen, setIsLogoChoosen] = useState(false);
  const [isMainPictureChoosen, setIsMainPictureChoosen] = useState(false);
  const [stepChecked, setStepChecked] = useState(1);
  const [idNewProject, setIdNewProject] = useState(null);

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

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (stepChecked === 2 && !isLogoChoosen) {
      errorToast("Vous devez ajouter un logo avant de continuer !");
      return;
    }

    if (stepChecked === 3 && !isMainPictureChoosen) {
      errorToast(
        "Vous devez ajouter une image principale avant de continuer !"
      );
      return;
    }

    if (stepChecked === 4) {
      const currentProject = projectsList.find(
        (proj) => proj.id === idNewProject
      );
      const screenshots = currentProject
        ? currentProject.pictures.filter((pic) => pic.type === "screenshot")
        : [];
      if (screenshots.length === 0) {
        errorToast(
          "Vous devez ajouter au moins un screenshot avant de continuer !"
        );
        return;
      }
    }

    if (
      stepChecked === 5 &&
      (!projectSkill.skill_id || projectSkill.skill_id.length === 0)
    ) {
      errorToast("Vous devez ajouter une compétence avant de continuer !");
      return;
    }
    setStepChecked(stepChecked + 1);

    if (stepChecked === 2 || stepChecked === 3 || stepChecked === 4) {
      setFileName("");
    }
  };

  const goToPrevStep = (e) => {
    e.preventDefault();
    setStepChecked(stepChecked - 1);
    if (stepChecked === 2 || stepChecked === 3 || stepChecked === 4) {
      setFileName("");
    }
  };

  const handleSubmitProject = async () => {
    try {
      const response = await connexion.post("/api/projects", newProject);
      const projectId = response.data.insertId;
      setIdNewProject(projectId);
      setSuccess(true);
      setIsCreated(true);
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
      await handleSubmitProject();
    }
    if (isCreated) {
      await handleModifyProject(idNewProject);
    }
    await fetchProject();
    setRender(!render);
    if (success) {
      goToNextStep();
    }
  };

  const handleSubmitImage = async (event, inputRef, type) => {
    event.preventDefault();

    try {
      await uploadProjectImage(inputRef.current.files[0], idNewProject, type);
      if (stepChecked === 2 && !isLogoChoosen) {
        setIsLogoChoosen(true);
        setSuccess(true);
      }
      if (stepChecked === 3 && !isMainPictureChoosen) {
        setIsMainPictureChoosen(true);
      }
      setRender(!render);
    } catch (error) {
      errorToast(
        "Problème lors de l'upload de l'image, vérifiez que vous chargez bien une image dans un format correct !"
      );
      console.error(error);
    }
  };

  const handleSubmitModifyPicture = async (event, inputRef, type) => {
    event.preventDefault();
    try {
      await uploadModifyProjectImage(
        inputRef.current.files[0],
        idNewProject,
        type
      );
      setRender(!render);
      setFileName("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitSkill = async (event) => {
    event.preventDefault();
    try {
      await connexion.post("/api/projectSkill", projectSkill);
      setRender(!render);
      successToast("Compétence ajoutée avec succès !");
    } catch (error) {
      errorToast("Vous ne pouvez pas ajouter deux fois la même compétence !");
      console.error(error);
    }
  };

  const stepperConfig = [
    {
      title: !isCreated ? "Créer un projet :" : "Modifier le projet :",
      hasPrev: false,
      hasNext: false,
    },
    {
      title: !isLogoChoosen ? "Ajouter un logo :" : "Modifier le logo :",
      hasPrev: true,
      hasNext: true,
    },
    {
      title: !isMainPictureChoosen
        ? "Ajouter une image principale :"
        : "Modifier l'image principale :",
      hasPrev: true,
      hasNext: true,
    },
    {
      title: "Ajouter ou supprimer des screenshots :",
      hasPrev: true,
      hasNext: true,
    },
    {
      title: "Ajouter ou supprimer des compétences :",
      hasPrev: true,
      hasNext: true,
    },
    {
      title: "Récapitulatif de mon projet :",
      hasPrev: true,
    },
  ];

  const titleModal = () => {
    const stepConfig = stepperConfig[stepChecked - 1];
    return stepConfig ? (
      <h3 className="modal-title">{stepConfig.title}</h3>
    ) : null;
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
      <h2 className="all-project-title">Mes projets</h2>
      {logUser ? (
        <button className="button" type="button" onClick={openModalAddProject}>
          Nouveau projet +
        </button>
      ) : null}
      <section className="page-display projects-list">
        {projectsList.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            css={
              projectsList.length % 2 === 0 ||
              (projectsList.length - 1) % 6 === 0
                ? "project-card pair-width"
                : "project-card impair-width"
            }
            projectListLength={projectsList.length}
            carousel={false}
          />
        ))}
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={isCreated ? openValidationModal : closeModal}
        contentLabel="Image Modal"
        className="Modal"
        appElement={document.getElementById("root")}
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
        {stepperConfig[stepChecked - 1]?.hasPrev && (
          <button type="button" className="button" onClick={goToPrevStep}>
            Retour
          </button>
        )}
        <div className="modal-separation-ui" />
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
          handleSubmit={(e) => handleSubmitImage(e, inputRefLogo, "logo")}
          inputRef={inputRefLogo}
          label={!isLogoChoosen ? "Ajoutez un logo !" : "Modifiez le logo !"}
          projectId={idNewProject}
          isLogoChoosen={isLogoChoosen}
          isMainPictureChoosen={isMainPictureChoosen}
          handleSubmitModifyPicture={(e) =>
            handleSubmitModifyPicture(e, inputRefLogo, "logo")
          }
          setRender={setRender}
          isProject
        />
        <ImageForm
          stepChecked={stepChecked}
          step={3}
          handleSubmit={(e) => handleSubmitImage(e, inputRefMainImage, "main")}
          inputRef={inputRefMainImage}
          label={
            !isMainPictureChoosen
              ? "Ajoutez l'image principale du projet !"
              : "Modifiez l'image principale du projet !"
          }
          projectId={idNewProject}
          isLogoChoosen={isLogoChoosen}
          isMainPictureChoosen={isMainPictureChoosen}
          handleSubmitModifyPicture={(e) =>
            handleSubmitModifyPicture(e, inputRefMainImage, "main")
          }
          isProject
        />
        <ImageForm
          stepChecked={stepChecked}
          step={4}
          handleSubmit={(e) =>
            handleSubmitImage(e, inputRefScreenshots, "screenshot")
          }
          inputRef={inputRefScreenshots}
          label="Screenshots !"
          projectId={idNewProject}
          isProject
        />
        <SkillForm
          stepChecked={stepChecked}
          step={5}
          projectId={idNewProject}
          handleSubmit={handleSubmitSkill}
          setProjectSkill={setProjectSkill}
          render={render}
          setRender={setRender}
          setSkillList={setProjectSkill}
        />

        {stepperConfig[stepChecked - 1].hasNext && (
          <button type="button" className="button" onClick={goToNextStep}>
            Prochaine étape !
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
        setRender={setRender}
        render={render}
        text1="Êtes-vous sûre de vouloir quitter ?"
        text2="Attention, les données ne seront pas sauvegardées !"
        handleDelete={handleDeleteProject}
      />
      <ToastContainer />
    </>
  );
}

export default AllProjects;
