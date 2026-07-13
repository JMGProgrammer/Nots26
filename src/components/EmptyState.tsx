import { Plus } from "lucide-react";

interface EmptyStateProps {
  onAddNote: () => void;
}

export function EmptyState({ onAddNote }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <button type="button" onClick={onAddNote}>
        <Plus size={18} aria-hidden />
        Crear primera nota
      </button>
    </div>
  );
}
