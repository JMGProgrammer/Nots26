import { Check, Lightbulb, StickyNote, X } from "lucide-react";
import type { NoteKind } from "../types/note";

interface CanvasContextMenuProps {
  x: number;
  y: number;
  onCreate: (kind: NoteKind, color: string) => void;
  onClose: () => void;
}

const noteTypes: Array<{ kind: NoteKind; label: string; icon: typeof StickyNote }> = [
  { kind: "text", label: "Texto", icon: StickyNote },
  { kind: "task", label: "Tarea", icon: Check },
  { kind: "idea", label: "Idea", icon: Lightbulb },
];

const colors = ["#6f4bd8", "#168aad", "#f77f00", "#d62828", "#2a9d8f"];

export function CanvasContextMenu({ x, y, onCreate, onClose }: CanvasContextMenuProps) {
  return (
    <div className="canvas-menu" style={{ left: x, top: y }} role="menu">
      <div className="canvas-menu-header">
        <strong>Nueva nota</strong>
        <button type="button" onClick={onClose} title="Cerrar">
          <X size={14} aria-hidden />
        </button>
      </div>

      <div className="canvas-menu-grid">
        {noteTypes.map(({ kind, label, icon: Icon }) => (
          <button key={kind} type="button" onClick={() => onCreate(kind, colors[0])} role="menuitem">
            <Icon size={16} aria-hidden />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="canvas-menu-colors" aria-label="Crear nota por color">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            style={{ backgroundColor: color }}
            onClick={() => onCreate("text", color)}
            title={`Nota ${color}`}
          />
        ))}
      </div>
    </div>
  );
}
