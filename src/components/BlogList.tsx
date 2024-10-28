import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Edit2, Trash2, ArrowRight, Tag, User } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { Post } from "../types";
import { Loader } from "./ui/Loader";
import { ErrorMessage } from "./ui/ErrorMessage";
import { DeleteDialog } from "./ui/DeleteDialog";
import { useDarkMode } from "../hooks/useDarkMode";
import { useToast } from "../hooks/useToast";
import { useBlogStore } from "../store/blogStore";

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=2000&q=80",
];

const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

const BlogList = () => {
  const { data: posts, loading, error } = useApi<Post[]>("/posts");
  const { isDarkMode } = useDarkMode();
  const { addToast } = useToast();
  const deletePost = useBlogStore((state) => state.deletePost);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    post: Post | null;
  }>({
    isOpen: false,
    post: null,
  });

  const handleDeleteClick = (post: Post) => {
    setDeleteDialog({ isOpen: true, post });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.post) return;

    try {
      deletePost(deleteDialog.post.id);
      addToast({
        title: "Éxito",
        message: "Post eliminado correctamente",
        type: "success",
      });
    } catch (error) {
      addToast({
        title: "Error",
        message: "Error al eliminar el post",
        type: "error",
      });
    } finally {
      setDeleteDialog({ isOpen: false, post: null });
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!posts?.length) {
    return (
      <div
        className={`text-center py-12 ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        <p className="text-xl">No hay posts disponibles</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1
          className={`text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Artículos Recientes
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow`}
          >
            <img
              src={PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                {post.category && (
                  <span
                    className={`inline-flex items-center gap-1 text-sm ${
                      isDarkMode ? "text-indigo-400" : "text-indigo-600"
                    }`}
                  >
                    <Tag className="w-4 h-4" />
                    {post.category}
                  </span>
                )}
              </div>

              <h2
                className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {truncateText(post.title, 60)}
              </h2>

              <div
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } space-y-4`}
              >
                <p className="line-clamp-3">{post.content}</p>

                {post.author && (
                  <div
                    className={`flex items-center gap-2 text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-2">
                  <Link
                    to={`/edit/${post.id}`}
                    className={`p-2 rounded-full ${
                      isDarkMode
                        ? "hover:bg-gray-700 text-gray-300"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                    title="Editar"
                  >
                    <Edit2 className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(post)}
                    className={`p-2 rounded-full ${
                      isDarkMode
                        ? "hover:bg-gray-700 text-gray-300"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                    title="Eliminar"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <Link
                  to={`/post/${post.id}`}
                  className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-500"
                >
                  Leer más <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, post: null })}
        onConfirm={handleDeleteConfirm}
        title={deleteDialog.post?.title || ""}
      />
    </div>
  );
};

export default BlogList;
