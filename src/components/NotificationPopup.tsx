import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export type NotificationType = "success" | "error" | "info";

interface NotificationPopupProps {
  type: NotificationType;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  type = "info",
  message,
  isOpen,
  onClose,
  autoClose = true,
  autoCloseTime = 5000,
}) => {
  // State to manage animation
  const [isVisible, setIsVisible] = useState(false);

  // Handle auto-close functionality
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);

      // Auto close after specified time if autoClose is true
      if (autoClose && autoCloseTime > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, autoCloseTime);

        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, autoClose, autoCloseTime]);

  // Handle close with animation
  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      onClose();
    }, 300); // Match this with CSS transition time
  };

  // If not open, don't render anything
  if (!isOpen) return null;

  // Determine icon and colors based on notification type
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle className="h-6 w-6 text-green-500" />,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          buttonBg: "bg-green-100 hover:bg-green-200 text-green-700",
        };
      case "error":
        return {
          icon: <AlertCircle className="h-6 w-6 text-red-500" />,
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          buttonBg: "bg-red-100 hover:bg-red-200 text-red-700",
        };
      case "info":
      default:
        return {
          icon: <Info className="h-6 w-6 text-blue-500" />,
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          buttonBg: "bg-blue-100 hover:bg-blue-200 text-blue-700",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
      onClick={(e) => {
        // Close when clicking outside the popup
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className={`${styles.bgColor} ${
          styles.borderColor
        } border rounded-lg shadow-lg p-4 max-w-sm w-full mx-4 transform transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">{styles.icon}</div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-800">{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleClose}
            className={`px-4 py-2 text-sm font-medium rounded-md ${styles.buttonBg} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
