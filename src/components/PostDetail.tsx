import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";
import { useApi } from "../hooks/useApi";
import { Post } from "../types";
import { Loader } from "./ui/Loader";
import { ErrorMessage } from "./ui/ErrorMessage";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { data: post, loading, error } = useApi<Post>(`/posts/${id}`);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!post) return null;

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto"
    >
      <button
        onClick={() => navigate("/")}
        className={`flex items-center space-x-2 ${
          isDarkMode
            ? "text-gray-300 hover:text-indigo-400"
            : "text-gray-600 hover:text-indigo-600"
        } mb-8`}
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Volver a los posts</span>
      </button>

      <motion.img
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=2000&q=80"
        alt={post.title}
        className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-8"
      />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {post.category && (
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              isDarkMode
                ? "bg-gray-700 text-indigo-400"
                : "bg-gray-100 text-indigo-600"
            }`}
          >
            <Tag className="w-4 h-4" />
            {post.category}
          </span>
        )}

        <h1
          className={`text-4xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {post.title}
        </h1>

        <div className="flex items-center gap-6">
          {post.author && (
            <div
              className={`flex items-center gap-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
          )}
          {post.date && (
            <div
              className={`flex items-center gap-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>
                {format(new Date(post.date), "d 'de' MMMM, yyyy", {
                  locale: es,
                })}
              </span>
            </div>
          )}
        </div>

        <div
          className={`prose prose-lg max-w-none ${
            isDarkMode ? "prose-invert" : ""
          }`}
        >
          <p
            className={`leading-relaxed whitespace-pre-wrap ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {post.content}
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
};

export default PostDetail;
