import {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";

import connexion from "../services/connexion";
import successToast from "../components/Toast/successToast";

const PortefolioContext = createContext();

export function PortefolioProvider({ children }) {
  const initialProject = useMemo(
    () => ({
      name: "",
      github_link: "",
      website_link: "",
      team: "",
      main_technologies: "",
      organization: "",
      description: "",
      project_category_id: "0",
      status_id: "",
    }),
    []
  );

  const [logUser, setLogUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newProject, setNewProject] = useState(initialProject);
  const [render, setRender] = useState(false);
  const [projectsList, setProjectsList] = useState([]);
  const [fileName, setFileName] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [allStatus, setAllStatus] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await connexion.get("/api/messages");
      setMessages(response.data);
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const notReadMessages = (messages || []).filter(
    (message) => message.is_read === 0
  );

  const markMessageAsRead = useCallback(async (id) => {
    try {
      // Envoyer la requête à ton API pour marquer comme lu
      await connexion.put(`/api/messages/${id}`, { is_read: 1 });

      // Mettre à jour localement le message dans le state
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === id ? { ...msg, is_read: 1 } : msg
        )
      );
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du message comme lu:",
        error
      );
    }
  }, []);

  const openModal = useCallback((title, content) => {
    setModalTitle(title);
    setModalType(content);
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  const fetchProject = useCallback(async () => {
    const response = await connexion.get("/api/projects");
    setProjectsList(response.data);
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await connexion.get("/api/category");
      setAllCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchStatus = useCallback(async () => {
    try {
      const response = await connexion.get("/api/status");
      setAllStatus(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleModifyProject = useCallback(
    async (id) => {
      try {
        await connexion.put(`/api/projects/${id}`, newProject);
        successToast("Modification enregistrée");
      } catch (error) {
        console.error(error);
      }
    },
    [newProject]
  );
  const handleDeleteProject = useCallback(
    async (id) => {
      try {
        await connexion.delete(`/api/projects/${id}`);
        setRender(!render);
      } catch (error) {
        console.error(error);
      }
    },
    [render]
  );

  const checkToken = useCallback(async () => {
    try {
      await connexion.get("api/messages");
    } catch (error) {
      console.error("Token invalide ou expiré:", error);
      setLogUser(null);
      localStorage.removeItem("LogUser");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUser = useCallback((user) => {
    if (user) {
      localStorage.setItem("LogUser", JSON.stringify(user));
      setLogUser(user);
    } else {
      localStorage.removeItem("LogUser");
      setLogUser(null);
    }
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("LogUser");
    if (savedUser) {
      setLogUser(JSON.parse(savedUser));
    } else {
      setLogUser(null);
    }
    checkToken();
  }, [checkToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkToken();
    }, 300000);

    return () => clearInterval(interval);
  }, [checkToken]);

  const value = useMemo(
    () => ({
      logUser,
      isLoading,
      handleUser,
      newProject,
      setNewProject,
      handleModifyProject,
      initialProject,
      handleDeleteProject,
      render,
      setRender,
      fetchProject,
      projectsList,
      fileName,
      setFileName,
      fetchCategories,
      fetchStatus,
      allStatus,
      allCategories,
      modalIsOpen,
      modalTitle,
      modalType,
      openModal,
      closeModal,
      messages,
      fetchMessages,
      notReadMessages,
      markMessageAsRead,
    }),
    [
      logUser,
      isLoading,
      handleUser,
      newProject,
      setNewProject,
      handleModifyProject,
      initialProject,
      handleDeleteProject,
      render,
      setRender,
      fetchProject,
      projectsList,
      fileName,
      setFileName,
      fetchCategories,
      fetchStatus,
      allStatus,
      allCategories,
      modalIsOpen,
      modalTitle,
      modalType,
      openModal,
      closeModal,
      messages,
      fetchMessages,
      notReadMessages,
      markMessageAsRead,
    ]
  );

  return (
    <PortefolioContext.Provider value={value}>
      {children}
    </PortefolioContext.Provider>
  );
}

PortefolioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const usePortefolio = () => useContext(PortefolioContext);
