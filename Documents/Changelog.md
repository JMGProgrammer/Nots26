# Changelog

## [Unreleased]

### Añadido

- Creación de la carpeta de documentación del proyecto.
- Documento de requisitos funcionales inicial.
- Documento de plan de iteraciones.
- Documento de requisitos específicos.
- Documento de base de implementación.
- Proyecto base con React, TypeScript y Vite.
- Canvas principal basado en React Flow.
- Componente de nota editable con título, contenido, tipo, color y tags.
- Creación, movimiento y eliminación de notas.
- Creación y eliminación de conexiones entre notas.
- Guardado automático del workspace en LocalStorage.
- Sidebar con búsqueda, resumen, tags y selección actual.
- Menú contextual del canvas para crear notas en la posición del usuario.
- Creación rápida de notas por tipo: texto, tarea e idea.
- Creación rápida de notas por color desde el menú del canvas.
- Estado de tarea pendiente/completada dentro de las notas tipo tarea.
- Sidebar contraíble con modo rail para ampliar el espacio del canvas.
- Filtros por tipo de nota: texto, tareas e ideas.
- Conteos por tipo de nota dentro del sidebar.
- Identidad visual diferenciada para notas de texto, tareas e ideas.

### Cambiado

- Se estableció Nots26 como nombre del producto.
- Se definió una metodología Scrum ajustada como enfoque de trabajo.
- Se incorporó React Flow como base técnica propuesta para el canvas interactivo.
- Se inició la construcción del MVP siguiendo la Iteración 1 del plan.
- Se avanzó la Iteración 2 con mejoras de interacción visual y organización.
- Se ajustó el canvas para crear notas mediante click derecho o doble click en el espacio.
- Se activó snap-to-grid para ordenar mejor el posicionamiento de notas.
- Se corrigió la grilla duplicada del canvas dejando una sola capa visual.
- Se completó la Iteración 2 con mejoras de organización visual y soporte responsive.
- Se ajustó el sidebar en pantallas pequeñas para conservar controles sin ocultarlos por completo.
- Se ampliaron zonas interactivas en dispositivos táctiles.

### Pendiente

- Iniciar la Iteración 3 con mejoras de conexiones entre notas.
- Permitir edición o categorización de conexiones.
- Mejorar eliminación y selección explícita de conexiones.
