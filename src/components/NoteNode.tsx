import type { ChangeEvent, CSSProperties, ReactNode } from "react";
import { Check, Lightbulb, StickyNote, Trash2 } from "lucide-react";
import { Handle, Position, type NodeProps } from "reactflow";
import type { NoteData, NoteKind } from "../types/note";

const kindIcons: Record<NoteKind, ReactNode> = {
  text: <StickyNote size={14} aria-hidden />,
  task: <Check size={14} aria-hidden />,
  idea: <Lightbulb size={14} aria-hidden />,
};

const colorOptions = ["#6f4bd8", "#168aad", "#f77f00", "#d62828", "#2a9d8f"];

export function NoteNode({ id, data, selected }: NodeProps<NoteData>) {
  const update = (patch: Partial<NoteData>) => data.onUpdate?.(id, patch);

  const updateTags = (event: ChangeEvent<HTMLInputElement>) => {
    const tags = event.target.value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    update({ tags });
  };

  return (
    <article
      className={`note-node ${selected ? "is-selected" : ""} ${data.kind === "task" && data.done ? "is-done" : ""}`}
      style={{ "--note-color": data.color } as CSSProperties}
    >
      <Handle type="target" position={Position.Top} className="note-handle" />
      <div className="note-node-header">
        <div className="note-kind" title={data.kind}>
          {kindIcons[data.kind]}
        </div>
        <input
          className="note-title nodrag"
          value={data.title}
          onChange={(event) => update({ title: event.target.value })}
          aria-label="Titulo de la nota"
        />
        <button type="button" className="node-icon-button nodrag" onClick={() => data.onDelete?.(id)} title="Eliminar nota">
          <Trash2 size={14} aria-hidden />
        </button>
      </div>

      <textarea
        className="note-content nodrag"
        value={data.content}
        onChange={(event) => update({ content: event.target.value })}
        aria-label="Contenido de la nota"
      />

      <div className="note-node-footer nodrag">
        <select value={data.kind} onChange={(event) => update({ kind: event.target.value as NoteKind })} aria-label="Tipo de nota">
          <option value="text">Texto</option>
          <option value="task">Tarea</option>
          <option value="idea">Idea</option>
        </select>

        <div className="swatches" aria-label="Color de nota">
          {colorOptions.map((color) => (
            <button
              key={color}
              type="button"
              className={`swatch ${data.color === color ? "active" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => update({ color })}
              title={`Color ${color}`}
            />
          ))}
        </div>
      </div>

      {data.kind === "task" && (
        <label className="task-toggle nodrag">
          <input
            type="checkbox"
            checked={Boolean(data.done)}
            onChange={(event) => update({ done: event.target.checked })}
          />
          <span>{data.done ? "Completada" : "Pendiente"}</span>
        </label>
      )}

      <input
        className="note-tags nodrag"
        value={data.tags.join(", ")}
        onChange={updateTags}
        placeholder="tags"
        aria-label="Etiquetas separadas por coma"
      />
      <Handle type="source" position={Position.Bottom} className="note-handle" />
    </article>
  );
}
