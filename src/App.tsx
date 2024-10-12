import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ArticleCarousel from "./components/ArticleCarousel";
import ArticleList from "./components/ArticleList";
import ArticleForm from "./components/ArticleForm";
import { Article, ArticleType } from "./types/Article";
import { PlusCircle } from "lucide-react";
import imgActualidad from "./assets/actualidad.jpg";
import imgCulture from "./assets/culture.jpg";
import imgDeporte from "./assets/deporte.jpg";

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  useEffect(() => {
    // Simulating fetching articles from an API
    const fetchedArticles: Article[] = [
      {
        id: "1",
        title: "Últimas noticias sobre tecnología",
        author: "Juan Pérez",
        content:
          "La inteligencia artificial está transformando la industria tecnológica a un ritmo sin precedentes. Desde asistentes virtuales más inteligentes hasta sistemas de conducción autónoma, la IA está redefiniendo cómo interactuamos con la tecnología en nuestra vida diaria.",
        createdAt: new Date("2024-03-10"),
        updatedAt: new Date("2024-03-10"),
        type: "Actualidad",
        imageUrl: imgActualidad,
      },
      {
        id: "2",
        title: "Resumen de la jornada deportiva",
        author: "María González",
        content:
          "Este fin de semana, el mundo del deporte nos ha regalado momentos emocionantes. En fútbol, el clásico entre rivales históricos terminó en un empate electrizante. Mientras tanto, en tenis, una joven promesa sorprendió al mundo al vencer al número uno en un torneo importante.",
        createdAt: new Date("2024-03-11"),
        updatedAt: new Date("2024-03-11"),
        type: "Deporte",
        imageUrl: imgCulture,
      },
      {
        id: "3",
        title: "Nueva exposición en el museo local",
        author: "Carlos Rodríguez",
        content:
          "El museo de la ciudad inaugura una exposición fascinante de arte contemporáneo que explora temas de identidad y tecnología. La muestra incluye obras de artistas emergentes y establecidos, ofreciendo una visión única de cómo la era digital está influyendo en la expresión artística.",
        createdAt: new Date("2024-03-12"),
        updatedAt: new Date("2024-03-12"),
        type: "Cultura",
        imageUrl: imgDeporte,
      },
    ];
    setArticles(fetchedArticles);
  }, []);

  const handleCreateArticle = (
    newArticle: Omit<Article, "id" | "createdAt" | "updatedAt">
  ) => {
    const article: Article = {
      ...newArticle,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setArticles([...articles, article]);
    setIsFormVisible(false);
  };

  const handleUpdateArticle = (
    updatedArticle: Omit<Article, "id" | "createdAt" | "updatedAt">
  ) => {
    if (editingArticle) {
      const updatedArticles = articles.map((article) =>
        article.id === editingArticle.id
          ? { ...article, ...updatedArticle, updatedAt: new Date() }
          : article
      );
      setArticles(updatedArticles);
      setEditingArticle(null);
      setIsFormVisible(false);
    }
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setIsFormVisible(true);
  };

  const handleCancelForm = () => {
    setEditingArticle(null);
    setIsFormVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section id="featured-articles" className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Artículos Destacados
          </h2>
          <ArticleCarousel articles={articles} />
        </section>
        <section id="article-management" className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Gestión de Artículos
            </h2>
            <button
              id="new-article-btn"
              onClick={() => setIsFormVisible(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <PlusCircle size={20} />
              <span>Nuevo Artículo</span>
            </button>
          </div>
          {isFormVisible ? (
            <div
              id="article-form-container"
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {editingArticle ? "Editar Artículo" : "Crear Nuevo Artículo"}
              </h3>
              <ArticleForm
                article={editingArticle || undefined}
                onSubmit={
                  editingArticle ? handleUpdateArticle : handleCreateArticle
                }
                onCancel={handleCancelForm}
              />
            </div>
          ) : (
            <ArticleList articles={articles} onEdit={handleEditArticle} />
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
