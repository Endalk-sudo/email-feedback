import { createContext, useContext, useState } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, description, variant }) => {
    const newToast = { title, description, variant };
    setToasts((prev) => [...prev, newToast]);
    // Optionally, you can set a timeout to remove the toast after a few seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter(t => t !== newToast));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Render your toasts here */}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};