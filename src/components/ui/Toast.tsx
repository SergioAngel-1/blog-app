import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface Toast {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastProps extends Toast {
  onClose: (id: string) => void;
}

export const Toast = ({ id, title, message, type, onClose }: ToastProps) => {
  const colors = {
    success: "bg-green-50 text-green-800 border-green-200",
    error: "bg-red-50 text-red-800 border-red-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`w-full max-w-sm rounded-lg border p-4 shadow-lg ${colors[type]}`}
    >
      <div className="flex items-start justify-between">
        <span className="text-sm font-semibold">{title}</span>
        <button
          onClick={() => onClose(id)}
          className="ml-4 inline-flex text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-1 text-sm">{message}</p>
    </motion.div>
  );
};
