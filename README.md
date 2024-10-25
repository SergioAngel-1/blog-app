# MiniBlog

Una aplicación de blog moderna y responsiva construida con React, TypeScript y Tailwind CSS. Cuenta con un hermoso modo oscuro, animaciones suaves y una interfaz CRUD completa para gestionar entradas de blog.

## Características

- 🎨 Interfaz moderna con Tailwind CSS
- 🌓 Soporte para modo claro/oscuro
- ⚡ Rápida y responsiva
- 🔄 Operaciones CRUD completas
- 📱 Diseño adaptable a dispositivos móviles
- ✨ Animaciones suaves con Framer Motion
- 🎯 TypeScript para seguridad de tipos
- 📝 Soporte para contenido de texto enriquecido

## Comenzando

### Prerrequisitos

- Node.js (v14 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tuusuario/miniblog.git
cd miniblog
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

La aplicación se iniciará en modo desarrollo con el servidor Vite y JSON server ejecutándose concurrentemente.

## Estructura del Proyecto

```
miniblog/
├── src/
│   ├── components/     # Componentes React
│   ├── hooks/         # Hooks personalizados
│   ├── types/         # Definiciones de tipos TypeScript
│   └── main.tsx       # Punto de entrada de la aplicación
├── public/            # Archivos estáticos
└── db.json           # Base de datos JSON Server
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la versión de producción
- `npm run server` - Ejecuta JSON server por separado

## Tecnologías Utilizadas

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- JSON Server
- Vite
- Lucide React Icons
- React Router DOM
- Axios
- date-fns
- Zustand

## Contribuir

¡Las contribuciones son bienvenidas! No dudes en enviar un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.