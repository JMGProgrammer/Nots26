# Base de implementación de Nots26

## 1. Objetivo

Definir una base concreta y práctica para comenzar el desarrollo de Nots26, incluyendo el modelo de datos inicial, las historias de usuario, la estructura propuesta de componentes y las primeras tareas técnicas.

## 2. Historias de usuario

### HU-01: Crear una nota

Como usuario, quiero crear una nota nueva desde el canvas para capturar una idea rápidamente.

**Criterios de aceptación:**

- Puedo añadir una nota desde un botón o acción visible.
- La nota aparece en el canvas con un estado inicial válido.
- La nota queda guardada en el estado actual.

### HU-02: Editar una nota

Como usuario, quiero editar el contenido de una nota para modificar su información cuando lo necesite.

**Criterios de aceptación:**

- Puedo seleccionar una nota y modificar su título o contenido.
- Los cambios se reflejan visualmente en la interfaz.
- Los cambios se conservan al recargar la página.

### HU-03: Mover una nota

Como usuario, quiero arrastrar una nota para organizar visualmente mi espacio de trabajo.

**Criterios de aceptación:**

- Puedo mover una nota con el ratón o gesto táctil.
- La nota se actualiza de posición en tiempo real.
- La posición se guarda en el estado persistido.

### HU-04: Conectar notas

Como usuario, quiero vincular dos notas para representar relaciones entre ideas.

**Criterios de aceptación:**

- Puedo iniciar y completar una conexión entre dos notas.
- La conexión se muestra visualmente.
- La conexión se conserva al recargar la página.

### HU-05: Eliminar una nota o conexión

Como usuario, quiero eliminar una nota o una relación si ya no la necesito.

**Criterios de aceptación:**

- La nota o conexión desaparece de la interfaz.
- El sistema mantiene la consistencia del estado.

### HU-06: Persistir el workspace

Como usuario, quiero que mi trabajo se conserve aunque cierre o recargue la página.

**Criterios de aceptación:**

- El estado se guarda automáticamente.
- Al volver a cargar la página, el workspace se recupera.

## 3. Modelo de datos inicial

```ts
interface NoteNode {
  id: string;
  type: "note";
  position: { x: number; y: number };
  data: {
    title: string;
    content: string;
    color?: string;
    tags?: string[];
  };
}

interface NoteEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

interface WorkspaceState {
  nodes: NoteNode[];
  edges: NoteEdge[];
}
```

## 4. Estructura propuesta de componentes

### 4.1 Componentes principales

- App
- WorkspaceCanvas
- Toolbar
- NoteNode
- EdgeConnector
- SidebarPanel
- EmptyState

### 4.2 Responsabilidades

- App: inicializa la aplicación y el estado.
- WorkspaceCanvas: renderiza el canvas principal con React Flow.
- Toolbar: contiene acciones como crear nota, guardar, limpiar o volver al inicio.
- NoteNode: representa visualmente una nota.
- EdgeConnector: gestiona la creación y visualización de conexiones.
- SidebarPanel: muestra información seleccionada de una nota o conexión.
- EmptyState: muestra una vista inicial cuando no hay notas.

## 5. Tareas técnicas iniciales

### Fase 1: Preparación del proyecto

- Crear proyecto base con React + TypeScript.
- Instalar React Flow y dependencias básicas.
- Configurar estructura inicial de carpetas.
- Preparar almacenamiento local.

### Fase 2: Base del canvas

- Integrar React Flow en la vista principal.
- Mostrar un canvas vacío inicial.
- Configurar controles básicos de zoom y pan.

### Fase 3: Gestión de notas

- Crear nodos desde la interfaz.
- Implementar edición de contenido y título.
- Permitir mover nodos con arrastre.

### Fase 4: Conexiones

- Implementar creación de edges entre nodos.
- Permitir eliminar conexiones.
- Mantener consistencia visual del grafo.

### Fase 5: Persistencia y refinamiento

- Guardar estado en almacenamiento local.
- Cargar el estado al iniciar la aplicación.
- Ajustar diseño y experiencia básica.

## 6. Reglas de desarrollo inicial

- Mantener el sistema simple y modular.
- Separar lógica de estado de la capa visual.
- Priorizar la experiencia del usuario sobre la complejidad técnica.
- Evitar añadir funciones avanzadas antes de validar el MVP.
- Documentar cambios importantes en el estado y en la estructura del proyecto.

## 7. Criterios de aceptación de la base inicial

La base de implementación será considerada válida cuando:

- se pueda abrir la aplicación y ver el canvas,
- se pueda crear una nota,
- se pueda moverla dentro del canvas,
- se pueda conectar con otra nota,
- el estado se preserve al recargar la página.

## 8. Siguiente paso recomendado

Con esta base, el siguiente paso sería crear el proyecto real, instalar las dependencias y comenzar con la implementación de la vista principal y el estado inicial del workspace.
