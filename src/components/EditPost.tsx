import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useToast } from "../hooks/useToast";
import { useDarkMode } from "../hooks/useDarkMode";
import { Post } from "../types";
import { Loader } from "./ui/Loader";
import { ErrorMessage } from "./ui/ErrorMessage";

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

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { isDarkMode } = useDarkMode();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        setError("Error al cargar el post");
        addToast({
          title: "Error",
          message: "No se pudo cargar el post",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, addToast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await axios.put(`http://localhost:3001/posts/${id}`, {
        title: formData.get("title"),
        content: formData.get("content"),
        category: formData.get("category"),
        author: formData.get("author"),
        date: post?.date || new Date().toISOString().split("T")[0],
      });

      addToast({
        title: "Éxito",
        message: "Post actualizado correctamente",
        type: "success",
      });

      navigate("/");
    } catch (error) {
      addToast({
        title: "Error",
        message: "Error al actualizar el post",
        type: "error",
      });
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!post) return null;

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
        Editar Post
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
            defaultValue={post.title}
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
            defaultValue={post.category}
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
            defaultValue={post.author}
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
            defaultValue={post.content}
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
            Guardar Cambios
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditPost;
