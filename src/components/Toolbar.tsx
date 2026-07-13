import { MousePointer2, Plus, RotateCcw, Save, Trash2 } from "lucide-react";

interface ToolbarProps {
  noteCount: number;
  edgeCount: number;
  lastSavedAt: Date | null;
  onAddNote: () => void;
  onReset: () => void;
}

export function Toolbar({
  noteCount,
  edgeCount,
  lastSavedAt,
  onAddNote,
  onReset,
}: ToolbarProps) {
  return (
    <header className="toolbar">
      <div className="brand">
        <span className="brand-mark">N26</span>
        <div>
          <h1>Nots26</h1>
          <p>
            {noteCount} notas / {edgeCount} conexiones
          </p>
        </div>
      </div>

      <div className="toolbar-actions">
        <div className="save-state" title="Guardado automatico">
          <Save size={16} aria-hidden />
          <span>{lastSavedAt ? lastSavedAt.toLocaleTimeString() : "Listo"}</span>
        </div>
        <button type="button" className="icon-button" onClick={onAddNote} title="Nueva nota">
          <Plus size={18} aria-hidden />
        </button>
        <button type="button" className="icon-button" title="Seleccionar">
          <MousePointer2 size={18} aria-hidden />
        </button>
        <button type="button" className="icon-button danger" onClick={onReset} title="Limpiar workspace">
          <Trash2 size={18} aria-hidden />
        </button>
        <button type="button" className="icon-button" onClick={() => window.location.reload()} title="Recargar">
          <RotateCcw size={18} aria-hidden />
        </button>
      </div>
    </header>
  );
}
