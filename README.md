# QuestForge - Tu Gestor de Misiones Kanban ⚔️

Bienvenido a QuestForge, una aplicación de gestión de tareas inspirada en el universo de los RPGs, donde los proyectos son misiones épicas y las tareas son los objetivos para alcanzar la victoria. Este proyecto fue desarrollado como una solución frontend completa, utilizando React y herramientas modernas para crear una experiencia de usuario fluida e interactiva.

[🎥 Ver Video de Demostración](URL_DEL_VIDEO_AQUÍ)

---

## ✨ Características Principales

* **Gestión de Misiones (Proyectos):** Crea y visualiza múltiples misiones en una pantalla principal. Cada misión es un tablero Kanban independiente.
* **Tablero Kanban Interactivo:** Una interfaz clara que muestra las columnas de estado y las tareas correspondientes a cada misión.
* **Columnas y Tareas Dinámicas:**
    * Crea nuevas columnas directamente desde el tablero para personalizar los flujos de trabajo.
    * Añade nuevas tareas a cualquier columna a través de un formulario en un modal.
* **Arrastrar y Soltar (Drag & Drop) Fluido:** Mueve tareas entre columnas de forma intuitiva para actualizar su estado. La interfaz utiliza un `DragOverlay` para una animación suave y sin parpadeos.
* **Diseño Temático y Responsivo:** Una estética "gamer" con un tema oscuro y acentos de neón, diseñada para ser funcional tanto en escritorio como en dispositivos móviles.

---

## 🛠️ Tecnologías Utilizadas

* **React (con Vite):** Para la construcción de la interfaz de usuario, aprovechando la velocidad del entorno de desarrollo de Vite.
* **React Context API + Custom Hooks:** Para un manejo de estado global centralizado (`QuestContext`) y una lógica de acceso simplificada y reutilizable (`useQuests`).
* **React Router Dom:** Para manejar la navegación entre la vista de selección de proyectos y los tableros Kanban individuales.
* **Dnd Kit (`@dnd-kit`):** Una librería moderna y potente para implementar la funcionalidad de arrastrar y soltar de manera accesible y con un gran rendimiento.
* **CSS Moderno:** Estilizado con CSS plano, utilizando Flexbox y Grid para layouts responsivos y robustos.

---

## 🚀 Instalación y Ejecución

Para ejecutar este proyecto en tu máquina local, sigue estos sencillos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone [URL_DE_TU_REPO_DE_GITHUB_AQUÍ]
    ```

2.  **Navega a la carpeta del proyecto:**
    ```bash
    cd nombre-de-la-carpeta-del-proyecto
    ```

3.  **Instala las dependencias:**
    ```bash
    npm install
    ```

4.  **Ejecuta el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

5.  Abre tu navegador y ve a `http://localhost:5173` (o la URL que indique la terminal).

---

## 🏛️ Arquitectura y Estado

La aplicación está construida sobre una sólida arquitectura de componentes, promoviendo la reutilización de código a través de componentes como `Modal`, `Column` y `TaskCard`.

El estado es manejado de forma centralizada para evitar la prop-drilling y mantener una única fuente de verdad. La `Context API` de React se utiliza para proveer los datos y las funciones de manipulación a toda la aplicación, mientras que un Custom Hook (`useQuests`) abstrae la lógica de consumo del contexto, haciendo que los componentes sean más limpios y declarativos.