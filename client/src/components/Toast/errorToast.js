import { toast } from "react-toastify";

const errorToast = (msg) => {
  toast.error(msg, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export default errorToast;
