import React, { useState, useEffect } from 'react';
import { Article } from '../types/Article';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Interfaz de propiedades para ArticleCarousel
 * @param {Article[]} articles - Array de artículos que se mostrarán en el carrusel.
 */
interface ArticleCarouselProps {
  articles: Article[];
}

/**
 * Componente ArticleCarousel
 * Muestra un carrusel de artículos con deslizamiento automático y controles de navegación.
 * 
 * @param {ArticleCarouselProps} props - Propiedades del componente.
 * @returns {JSX.Element | null} El elemento JSX que representa el carrusel o null si no hay artículos.
 */
const ArticleCarousel: React.FC<ArticleCarouselProps> = ({ articles }) => {
  // Estado para rastrear el índice actual del carrusel
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * Hook useEffect para realizar la transición automática de diapositivas cada 5 segundos.
   * Limpia el intervalo al desmontar el componente o cuando cambian currentIndex o la longitud de los artículos.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Cambia la diapositiva cada 5 segundos
    return () => clearInterval(interval);
  }, [currentIndex, articles.length]);

  /**
   * Función para avanzar a la siguiente diapositiva en el carrusel.
   * Vuelve a la primera diapositiva al llegar al final.
   */
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  /**
   * Función para retroceder a la diapositiva anterior en el carrusel.
   * Vuelve a la última diapositiva cuando está en la primera.
   */
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + articles.length) % articles.length);
  };

  // Retorna null si no hay artículos para mostrar
  if (articles.length === 0) return null;

  return (
    <div id="article-carousel" className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
      {articles.map((article, index) => (
        <div
          key={article.id}
          id={`carousel-item-${article.id}`}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Elemento de imagen para el artículo */}
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              // Imagen de reserva en caso de que la imagen falle en cargar
              target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-6">
            {/* Título del artículo */}
            <h3 className="text-2xl font-bold mb-2">{article.title}</h3>
            {/* Autor del artículo */}
            <p className="text-sm mb-2">{article.author}</p>
            {/* Contenido truncado del artículo */}
            <p className="text-sm">{article.content.substring(0, 100)}...</p>
          </div>
        </div>
      ))}
      {/* Botón para navegar a la diapositiva anterior */}
      <button
        id="carousel-prev-btn"
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      {/* Botón para navegar a la siguiente diapositiva */}
      <button
        id="carousel-next-btn"
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ArticleCarousel;
