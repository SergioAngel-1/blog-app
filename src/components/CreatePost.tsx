import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "../hooks/useToast";
import { useDarkMode } from "../hooks/useDarkMode";
import { useBlogStore } from "../store/blogStore";

const CATEGORIES = [
  "Tecnología",
  "Desarrollo Web",
  "Programación",
  "Diseño UI/UX",
  "Base de Datos",
  "DevOps",
  "Inteligencia Artificial",
  "Otros",
];

const CreatePost = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { isDarkMode } = useDarkMode();
  const addPost = useBlogStore((state) => state.addPost);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      addPost({
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        category: formData.get("category") as string,
        author: formData.get("author") as string,
      });

      addToast({
        title: "Éxito",
        message: "Post creado correctamente",
        type: "success",
      });

      navigate("/");
    } catch (error) {
      addToast({
        title: "Error",
        message: "Error al crear el post",
        type: "error",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <h1
        className={`text-3xl font-bold mb-8 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Crear Nuevo Post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className={`block text-sm font-medium ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "border-gray-300"
            }`}
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className={`block text-sm font-medium ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Categoría
          </label>
          <select
            id="category"
            name="category"
            required
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "border-gray-300"
            }`}
          >
            <option value="">Selecciona una categoría</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="author"
            className={`block text-sm font-medium ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Autor
          </label>
          <input
            type="text"
            id="author"
            name="author"
            required
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "border-gray-300"
            }`}
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className={`block text-sm font-medium ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Contenido
          </label>
          <textarea
            id="content"
            name="content"
            rows={6}
            required
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "border-gray-300"
            }`}
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className={`px-4 py-2 rounded-md ${
              isDarkMode
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Crear Post
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreatePost;
