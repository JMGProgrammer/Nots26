import { ListFilter, Network, Search, Tags } from "lucide-react";
import type { NoteEdge, NoteNode } from "../types/note";

interface SidebarPanelProps {
  nodes: NoteNode[];
  edges: NoteEdge[];
  query: string;
  onQueryChange: (query: string) => void;
  selectedNode?: NoteNode;
}

export function SidebarPanel({
  nodes,
  edges,
  query,
  onQueryChange,
  selectedNode,
}: SidebarPanelProps) {
  const tags = Array.from(new Set(nodes.flatMap((node) => node.data.tags))).slice(0, 8);

  return (
    <aside className="sidebar">
      <div className="sidebar-search">
        <Search size={16} aria-hidden />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Buscar"
          aria-label="Buscar notas"
        />
      </div>

      <section className="sidebar-section">
        <h2>
          <ListFilter size={15} aria-hidden /> Resumen
        </h2>
        <div className="metric-row">
          <span>Notas</span>
          <strong>{nodes.length}</strong>
        </div>
        <div className="metric-row">
          <span>Conexiones</span>
          <strong>{edges.length}</strong>
        </div>
      </section>

      <section className="sidebar-section">
        <h2>
          <Tags size={15} aria-hidden /> Tags
        </h2>
        <div className="tag-list">
          {tags.length ? (
            tags.map((tag) => (
              <button key={tag} type="button" onClick={() => onQueryChange(tag)}>
                {tag}
              </button>
            ))
          ) : (
            <span className="muted">Sin tags</span>
          )}
        </div>
      </section>

      <section className="sidebar-section selected-panel">
        <h2>
          <Network size={15} aria-hidden /> Seleccion
        </h2>
        {selectedNode ? (
          <>
            <strong>{selectedNode.data.title || "Nota sin titulo"}</strong>
            <p>{selectedNode.data.content || "Sin contenido"}</p>
          </>
        ) : (
          <span className="muted">Nada seleccionado</span>
        )}
      </section>
    </aside>
  );
}
