import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: "success" | "error";
  message: string;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  status,
  message,
}) => {
  if (!isOpen) return null;

  const getStatusStyles = () => {
    return status === "success"
      ? {
          icon: <CheckCircle className="h-12 w-12 text-green-500" />,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          buttonBg: "bg-green-100 hover:bg-green-200 text-green-700",
          title: "Registration Successful!",
        }
      : {
          icon: <XCircle className="h-12 w-12 text-red-500" />,
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          buttonBg: "bg-red-100 hover:bg-red-200 text-red-700",
          title: "Registration Failed",
        };
  };

  const styles = getStatusStyles();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`${styles.bgColor} ${styles.borderColor} border rounded-lg shadow-lg p-6 max-w-sm w-full mx-4 transform transition-all duration-300 scale-100 opacity-100`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          {styles.icon}
          <h3 className="mt-4 text-xl font-semibold text-gray-900">
            {styles.title}
          </h3>
          <p className="mt-2 text-gray-600">{message}</p>
          <button
            onClick={onClose}
            className={`${styles.buttonBg} mt-6 px-4 py-2 rounded-md font-medium transition-colors duration-200 w-full`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
