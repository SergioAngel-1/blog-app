import React from "react";
import { AnimatePresence } from "framer-motion";
import { Toast } from "./Toast";
import { useToast } from "../../hooks/useToast";

export const Toaster = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-50 w-full max-w-sm p-4 space-y-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};
