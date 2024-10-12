import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Article } from '../types/Article';

/**
 * Interfaz de propiedades para el componente ArticleForm.
 * @param {Article} [article] - Artículo existente que se editará (opcional).
 * @param {(data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) => void} onSubmit - Función que se ejecuta al enviar el formulario.
 * @param {() => void} onCancel - Función que se ejecuta cuando se cancela la acción.
 */
interface ArticleFormProps {
  article?: Article;
  onSubmit: (data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

/**
 * Componente ArticleForm
 * Muestra un formulario para crear o editar un artículo.
 * 
 * @param {ArticleFormProps} props - Propiedades del componente.
 * @returns {JSX.Element} El formulario JSX para crear o actualizar un artículo.
 */
const ArticleForm: React.FC<ArticleFormProps> = ({ article, onSubmit, onCancel }) => {
  // Inicializa los métodos de control de formulario con react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Article, 'id' | 'createdAt' | 'updatedAt'>>({
    defaultValues: article, // Valores predeterminados si se está editando un artículo
  });

  /**
   * Manejador de envío del formulario.
   * @param {Omit<Article, 'id' | 'createdAt' | 'updatedAt'>} data - Datos del formulario sin los campos id, createdAt y updatedAt.
   */
  const onSubmitHandler: SubmitHandler<Omit<Article, 'id' | 'createdAt' | 'updatedAt'>> = (data) => {
    onSubmit(data);
  };

  return (
    <form id="article-form" onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      {/* Campo para el título del artículo */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Título
        </label>
        <input
          type="text"
          id="title"
          {...register('title', { required: 'El título es obligatorio' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      {/* Campo para el autor del artículo */}
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          Autor
        </label>
        <input
          type="text"
          id="author"
          {...register('author', { required: 'El autor es obligatorio' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>}
      </div>

      {/* Campo para el contenido del artículo */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Contenido
        </label>
        <textarea
          id="content"
          rows={5}
          {...register('content', { required: 'El contenido es obligatorio' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        ></textarea>
        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
      </div>

      {/* Campo para el tipo de artículo */}
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Tipo de artículo
        </label>
        <select
          id="type"
          {...register('type', { required: 'El tipo de artículo es obligatorio' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="">Selecciona un tipo</option>
          <option value="Actualidad">Actualidad</option>
          <option value="Deporte">Deporte</option>
          <option value="Cultura">Cultura</option>
        </select>
        {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
      </div>

      {/* Campo para la URL de la imagen */}
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
          URL de la imagen
        </label>
        <input
          type="text"
          id="imageUrl"
          {...register('imageUrl', { required: 'La URL de la imagen es obligatoria' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        {errors.imageUrl && <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>}
      </div>

      {/* Botones para cancelar o enviar el formulario */}
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          id="cancel-article-btn"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          id="submit-article-btn"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {article ? 'Actualizar' : 'Crear'} Artículo
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
