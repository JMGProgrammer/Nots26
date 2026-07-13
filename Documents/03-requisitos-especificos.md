# Requisitos específicos de Nots26

## 1. Propósito del documento

Este documento define una base técnica y funcional más concreta para el desarrollo de Nots26, considerando la idea de utilizar React Flow como librería principal para la interacción visual del canvas, el arrastre de notas y la creación de conexiones entre elementos.

## 2. Objetivo técnico del producto

Construir una aplicación web interactiva que permita:

- representar notas como nodos visuales,
- moverlos libremente dentro de un espacio de trabajo,
- conectar notas entre sí,
- editar su contenido de forma sencilla,
- persistir el estado del workspace.

## 3. Base de arquitectura propuesta

### 3.1 Stack recomendado

- Frontend: React
- Lenguaje: TypeScript
- Estilado: CSS Modules, Tailwind o CSS plano
- Gestión de estado: Zustand o React Context + hooks
- Librería de canvas interactivo: React Flow
- Persistencia: LocalStorage o IndexedDB
- Control de versiones: Git

### 3.2 Justificación del uso de React Flow

React Flow ofrece una base sólida para:

- crear nodos visuales,
- mover nodos por el canvas,
- implementar conexiones entre nodos,
- gestionar eventos de arrastre y edición,
- trabajar con un modelo gráfico muy adecuado para una herramienta de notas visuales.

Este framework resulta especialmente útil para el caso de Nots26 porque el producto central es precisamente la interacción entre elementos gráficos y relaciones entre notas.

## 4. Requisitos funcionales específicos

### RF-01: Workspace principal

El sistema debe mostrar un área principal de trabajo donde se puedan ubicar las notas como nodos interactivos.

### RF-02: Creación de nodos

El usuario debe poder crear nuevas notas desde la interfaz principal.

Cada nodo debe incluir:

- un identificador único,
- un título editable,
- un contenido editable,
- una posición inicial en el canvas,
- un estado visual configurable.

### RF-03: Edición del contenido

El usuario debe poder modificar el contenido de una nota desde la interfaz, sin necesidad de navegar a otra vista.

### RF-04: Arrastre de notas

Las notas deben poder moverse libremente en el canvas mediante arrastre.

Se debe asegurar que:

- el nodo siga al cursor durante el movimiento,
- la posición se actualice en tiempo real,
- la posición se guarde al persistir el estado.

### RF-05: Conexiones entre notas

El usuario debe poder conectar una nota con otra mediante un edge o enlace visual.

Se debe permitir:

- crear conexiones entre nodos,
- visualizar las relaciones de forma clara,
- eliminar una conexión cuando el usuario lo solicite.

### RF-06: Persistencia del estado

El sistema debe guardar el estado del workspace, incluyendo:

- notas creadas,
- sus posiciones,
- conexiones existentes,
- contenido editado.

### RF-07: Eliminación de elementos

El usuario debe poder eliminar una nota o una conexión, con una acción clara y reversible si es posible.

### RF-08: Gestión básica de etiquetas

El sistema debe permitir asignar etiquetas o categorías a las notas para facilitar su organización.

### RF-09: Búsqueda y filtrado

Debe existir una forma básica de buscar notas por título, contenido o etiquetas.

### RF-10: Modo de trabajo inicial simple

La primera versión debe priorizar la simplicidad sobre funciones avanzadas. El flujo principal debe ser:

1. crear nota,
2. editarla,
3. moverla,
4. conectar con otra,
5. guardar el estado.

## 5. Requisitos no funcionales

### RNF-01: Rendimiento

La interfaz debe responder de forma fluida al arrastrar nodos y al editar contenido en un volumen razonable de notas.

### RNF-02: Usabilidad

La experiencia debe ser intuitiva para usuarios sin experiencia previa con herramientas gráficas.

### RNF-03: Compatibilidad

La aplicación debe funcionar correctamente en navegadores modernos.

### RNF-04: Escalabilidad

La arquitectura debe permitir añadir nuevas funciones sin reescribir completamente el sistema.

### RNF-05: Mantenibilidad

El código debe estar organizado por módulos o capas claras, facilitando futuras ampliaciones.

## 6. Dependencias a utilizar

### 6.1 Dependencias principales

- react
- react-dom
- reactflow
- typescript
- vite (si se usa una base moderna)

### 6.2 Dependencias opcionales para etapas posteriores

- zustand
- lucide-react
- uuid
- localforage

## 7. Estructura de proyecto sugerida

Una estructura inicial podría ser:

- src/
  - components/
    - CanvasView
    - NoteNode
    - Sidebar
    - Toolbar
  - hooks/
    - useNotesStore
    - usePersistedState
  - types/
    - note.ts
    - connection.ts
  - utils/
    - id.ts
    - storage.ts
  - App.tsx
  - main.tsx

## 8. Reglas de implementación inicial

- Cada nota será representada como un nodo de React Flow.
- Cada conexión será un edge de React Flow.
- El estado del workspace se manejará de forma centralizada.
- La persistencia se realizará de forma local en el navegador.
- La interfaz debe mantenerse simple al inicio para facilitar pruebas rápidas y feedback.

## 9. Criterios de aceptación iniciales

Se considerará que la base inicial está lista cuando:

- el usuario pueda crear una nota en el canvas,
- pueda arrastrarla libremente,
- pueda crear una conexión entre dos notas,
- el estado se mantenga tras recargar la página,
- la experiencia sea estable y comprensible.

## 10. Siguiente paso recomendado

A partir de este documento, se puede pasar a una definición más concreta de:

- historias de usuario,
- tareas técnicas por iteración,
- modelo de datos inicial,
- estructura de componentes y estado.
