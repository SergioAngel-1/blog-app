import React from 'react';
import { Article } from '../types/Article';
import { Edit } from 'lucide-react';

// Propiedades que se esperan en el componente ArticleList
interface ArticleListProps {
  articles: Article[]; // Lista de artículos a mostrar
  onEdit: (article: Article) => void; // Función que se llama al editar un artículo
}

/**
 * Componente ArticleList
 * 
 * Este componente se encarga de renderizar una lista de artículos.
 * Cada artículo muestra su imagen, título, autor, fecha de creación,
 * un resumen de contenido y su tipo. Además, incluye un botón para 
 * editar el artículo.
 *
 * @param {ArticleListProps} props - Las propiedades del componente.
 * @param {Article[]} props.articles - La lista de artículos a mostrar.
 * @param {function} props.onEdit - Función a llamar al editar un artículo.
 *
 * @returns {JSX.Element} Elemento JSX que representa la lista de artículos.
 */
const ArticleList: React.FC<ArticleListProps> = ({ articles, onEdit }) => {
  return (
    <div id="article-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div key={article.id} id={`article-${article.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-48 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found'; // Imagen por defecto si falla la carga
            }}
          />
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h3>
              <button
                onClick={() => onEdit(article)} // Llama a la función onEdit al hacer clic
                className="text-blue-600 hover:text-blue-800 transition-colors"
                aria-label={`Editar artículo: ${article.title}`} // Atributo accesible
              >
                <Edit size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Por {article.author} | {new Date(article.createdAt).toLocaleDateString()} // Fecha de creación formateada
            </p>
            <p className="text-gray-700 mb-4">{article.content.substring(0, 100)}...</p> {/* Resumen del contenido */}
            <p className="text-sm text-gray-500 inline-block bg-gray-100 px-2 py-1 rounded">
              {article.type} {/* Tipo de artículo */}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
