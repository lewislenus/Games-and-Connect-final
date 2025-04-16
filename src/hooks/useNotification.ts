import { useState } from "react";
import { NotificationType } from "../components/NotificationPopup";

interface NotificationState {
  isOpen: boolean;
  type: NotificationType;
  message: string;
}

const useNotification = () => {
  // Initialize notification state
  const [notification, setNotification] = useState<NotificationState>({
    isOpen: false,
    type: "info",
    message: "",
  });

  // Show a notification
  const showNotification = (type: NotificationType, message: string) => {
    setNotification({
      isOpen: true,
      type,
      message,
    });
  };

  // Show success notification
  const showSuccess = (message: string) => {
    showNotification("success", message);
  };

  // Show error notification
  const showError = (message: string) => {
    showNotification("error", message);
  };

  // Show info notification
  const showInfo = (message: string) => {
    showNotification("info", message);
  };

  // Close the notification
  const closeNotification = () => {
    setNotification((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return {
    notification,
    showNotification,
    showSuccess,
    showError,
    showInfo,
    closeNotification,
  };
};

export default useNotification;
