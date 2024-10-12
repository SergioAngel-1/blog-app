import React from 'react';
import { Newspaper } from 'lucide-react';

/**
 * Componente Header
 * 
 * Este componente renderiza la cabecera principal del sitio, incluyendo
 * el título del blog y una barra de navegación con enlaces a las secciones
 * principales. Utiliza un fondo con degradado y un icono de periódico 
 * representando el tema del blog.
 *
 * @returns {JSX.Element} Elemento JSX que representa la cabecera del sitio.
 */
const Header: React.FC = () => {
  return (
    <header id="main-header" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Newspaper size={32} className="text-white" /> {/* Icono de periódico */}
          <h1 id="site-title" className="text-2xl font-bold">Mi Blog</h1> {/* Título del blog */}
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors">Inicio</a> {/* Enlace a Inicio */}
            </li>
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors">Categorías</a> {/* Enlace a Categorías */}
            </li>
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors">Acerca de</a> {/* Enlace a Acerca de */}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
