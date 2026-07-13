# Requisitos funcionales de Nots26

## 1. Propósito del documento

Este documento define los requisitos funcionales de Nots26, una herramienta de notas visuales orientada a la organización de ideas, tareas, conceptos y relaciones entre elementos. El sistema deberá permitir crear, organizar, conectar y gestionar notas de forma intuitiva, con soporte para interacción visual avanzada como arrastre, enlaces y vistas estructuradas.

## 2. Objetivo del producto

Desarrollar una aplicación de notas que permita a los usuarios:

- Capturar ideas y tareas rapidamente.
- Organizar información en un espacio visual flexible.
- Relacionar notas entre sí mediante conexiones.
- Reordenar el contenido con interacciones de arrastre.
- Buscar, filtrar y recuperar información facilmente.

## 3. Usuarios objetivo

- Usuarios individuales que necesitan organizar ideas personales.
- Equipos pequeños que trabajan con mapas mentales o tableros de tareas.
- Estudiantes y profesionales que requieren visualizar relaciones entre conceptos.

## 4. Alcance funcional general

El sistema debe ofrecer un entorno visual donde las notas puedan ser creadas, editadas, movidas, agrupadas, conectadas y gestionadas. Debe incluir soporte para persistencia de datos, organización por espacios o proyectos, y una experiencia que permita trabajar de forma fluida tanto en escritorio como en dispositivos táctiles.

## 5. Requisitos funcionales

### RF-01: Creación de notas

El sistema debe permitir crear nuevas notas desde una acción explícita del usuario, como un botón, un atajo de teclado o un clic en el área de trabajo.

Cada nota debe incluir al menos:

- Título o etiqueta inicial.
- Contenido editable.
- Color o estilo visual.
- Posición en el espacio de trabajo.

### RF-02: Edición de notas

El usuario debe poder modificar el contenido de una nota en cualquier momento.

Se deben soportar operaciones como:

- Cambiar título.
- Editar texto interno.
- Cambiar color o categoría.
- Ajustar tamaño y posición.

### RF-03: Eliminación de notas

El usuario debe poder eliminar una nota de forma sencilla.

La eliminación debe:

- Eliminar la nota del espacio visual.
- Remover sus conexiones asociadas si aplica.
- Ofrecer confirmación para evitar borrados accidentales.

### RF-04: Organización visual del canvas

El sistema debe presentar un espacio de trabajo principal donde las notas puedan ubicarse libremente.

Debe permitir:

- Mover notas manualmente.
- Ajustar la distribución visual del contenido.
- Zoom y pan del área de trabajo.
- Agrupar notas visualmente si se implementa en futuras iteraciones.

### RF-05: Arrastre de notas

El usuario debe poder arrastrar notas dentro del espacio de trabajo.

La interacción debe incluir:

- Movimiento fluido con el cursor o gesto táctil.
- Actualización de la posición en tiempo real.
- Persistencia de la posición tras guardar o recargar.

### RF-06: Conexiones entre notas

El sistema debe permitir vincular una nota con otra mediante una conexión visual.

La conexión debe permitir:

- Crear un vínculo entre dos notas.
- Mostrar visualmente la relación entre ellas.
- Identificar el tipo de vínculo, si se implementa, como "relaciona", "depende de", "subtarea", entre otros.
- Eliminar conexiones cuando el usuario lo solicite.

### RF-07: Tipos de notas

El sistema debe soportar distintos tipos de notas, por ejemplo:

- Nota de texto libre.
- Nota de tarea.
- Nota de idea o concepto.
- Nota de recordatorio.

Cada tipo puede cambiar la apariencia o el comportamiento base de la nota.

### RF-08: Etiquetas y clasificación

El usuario debe poder asignar etiquetas o categorías a las notas para mejorar la organización.

Las etiquetas deben permitir:

- Crear nuevas etiquetas.
- Asignar varias etiquetas por nota.
- Filtrar por etiquetas.
- Mostrar etiquetas en la interfaz.

### RF-09: Búsqueda y filtrado

El sistema debe permitir buscar notas por contenido, título o etiquetas.

También debe permitir filtrar por:

- Tipo de nota.
- Etiqueta.
- Estado de tarea, si aplica.
- Fecha de creación o modificación.

### RF-10: Guardado automático y persistencia

El sistema debe guardar automáticamente los cambios realizados en las notas y en sus relaciones.

Se debe garantizar que:

- Los datos persistan entre sesiones.
- El usuario no pierda cambios si la aplicación se cierra inesperadamente.
- La información se recupere al volver a abrir el proyecto o espacio de trabajo.

### RF-11: Múltiples espacios o proyectos

El sistema debe permitir organizar las notas en espacios o proyectos independientes.

Cada espacio debe poder contener:

- Sus propias notas.
- Sus propias conexiones.
- Su propio conjunto de etiquetas y configuraciones.

### RF-12: Historial de cambios

El sistema debe registrar cambios relevantes en las notas, como:

- Creación.
- Edición.
- Movimiento.
- Eliminación.
- Creación de conexiones.

Esto permitirá una mejor trazabilidad y futuras funciones de deshacer/rehacer.

### RF-13: Deshacer y rehacer

El usuario debe poder revertir o repetir acciones recientes, como:

- Crear una nota.
- Editar contenido.
- Mover una nota.
- Eliminar una nota.
- Crear o quitar una conexión.

### RF-14: Importación y exportación

El sistema debe permitir exportar el contenido del espacio de trabajo en formatos simples, como JSON o Markdown.

También se podría considerar la importación futura desde archivos externos.

### RF-15: Personalización visual

El usuario debe poder personalizar la apariencia de las notas y del entorno visual.

Opciones deseables:

- Cambiar colores.
- Ajustar tamaño de fuente.
- Cambiar el estilo de las conexiones.
- Modificar tema claro/oscuro.

### RF-16: Accesibilidad básica

La interfaz debe ser usable con un enfoque básico de accesibilidad, incluyendo:

- Contrastes adecuados.
- Etiquetas comprensibles.
- Compatibilidad con teclado en las acciones principales.
- Tamaños de interacción suficientes para uso táctil.

### RF-17: Estado de tareas (opcional pero recomendado)

Si se implementan notas de tipo tarea, deben permitir:

- Marcar como completada o pendiente.
- Cambiar estado visualmente.
- Filtrar tareas por estado.

### RF-18: Colaboración básica (futura iteración)

Aunque no es obligatorio para la primera versión, el sistema debería contemplar en el diseño la posibilidad de colaboración en tiempo real o por sincronización entre usuarios.

## 6. Reglas de negocio generales

- Toda nota debe poder existir dentro de un espacio o proyecto.
- Cada conexión debe estar asociada a dos notas válidas.
- Las acciones de usuario deben reflejarse inmediatamente en la interfaz.
- La información debe conservarse aunque la sesión finalice.
- Las acciones críticas deben contar con confirmación o recuperación.

## 7. Criterios de aceptación generales

Un requisito se considera implementado si:

- Permite al usuario realizar la acción descrita sin errores críticos.
- Mantiene la coherencia visual y lógica de las notas y conexiones.
- Preserva los datos al recargar o reiniciar la aplicación.
- Proporciona una experiencia clara y predecible.

## 8. Prioridades sugeridas

- Alta prioridad: creación, edición, eliminación, arrastre, conexiones, guardado.
- Media prioridad: etiquetas, búsqueda, historial, deshacer/rehacer.
- Baja prioridad o futura iteración: colaboración, importación/exportación avanzada, personalización extensa.

## 9. Metodología de trabajo propuesta

Se propone una metodología Scrum ajustada, ágil y flexible, orientada a entregar valor de forma incremental y a adaptarse a cambios sin perder claridad de dirección. Este enfoque permitirá trabajar de forma evolutiva, priorizando resultados útiles desde las primeras iteraciones y ajustando el alcance según el aprendizaje y las necesidades del producto.

### 9.1 Principios base

- Trabajar por iteraciones cortas y entregables funcionales.
- Priorizar la versión mínima viable antes de ampliar funcionalidades.
- Aceptar cambios en los requisitos cuando surjan nuevas necesidades o aprendizajes.
- Valorar el feedback del usuario desde etapas tempranas.
- Diseñar la arquitectura y la experiencia de forma escalable para futuros añadidos.

### 9.2 Enfoque recomendado

1. Definir una primera iteración centrada en las funcionalidades esenciales del producto: crear, editar, mover y conectar notas.
2. Desarrollar incrementos pequeños que puedan probarse rápidamente.
3. Revisar el resultado tras cada iteración y ajustar prioridades según la evolución del producto.
4. Mantener un backlog claro, donde las funcionalidades nuevas puedan incorporarse sin desorganizar el desarrollo.
5. Diseñar con modularidad para que nuevas funciones, como etiquetas avanzadas, vistas alternativas o colaboración, puedan añadirse sin reescribir el sistema desde cero.

### 9.3 Ventajas esperadas

- Menor riesgo al desarrollar funcionalidades complejas paso a paso.
- Mayor capacidad para responder a cambios de alcance o necesidades del usuario.
- Mejor control del producto en sus primeras etapas.
- Posibilidad de crecer de forma ordenada hacia versiones más completas.

## 10. Observaciones iniciales

Este documento puede evolucionar a medida que se defina el diseño, la arquitectura técnica y la estrategia de iteraciones. La prioridad inicial debe ser entregar una versión funcional de edición visual, movimiento de notas y conexiones entre elementos.
