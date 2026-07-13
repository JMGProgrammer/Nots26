import {
  Check,
  Lightbulb,
  ListFilter,
  Network,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  StickyNote,
  Tags,
  X,
} from "lucide-react";
import type { NoteEdge, NoteKind, NoteNode } from "../types/note";

interface SidebarPanelProps {
  nodes: NoteNode[];
  edges: NoteEdge[];
  query: string;
  collapsed: boolean;
  kindFilter: "all" | NoteKind;
  onQueryChange: (query: string) => void;
  onCollapsedChange: (collapsed: boolean) => void;
  onKindFilterChange: (kind: "all" | NoteKind) => void;
  selectedNode?: NoteNode;
}

const kindOptions: Array<{ value: "all" | NoteKind; label: string; icon: typeof StickyNote }> = [
  { value: "all", label: "Todo", icon: ListFilter },
  { value: "text", label: "Texto", icon: StickyNote },
  { value: "task", label: "Tareas", icon: Check },
  { value: "idea", label: "Ideas", icon: Lightbulb },
];

export function SidebarPanel({
  nodes,
  edges,
  query,
  collapsed,
  kindFilter,
  onQueryChange,
  onCollapsedChange,
  onKindFilterChange,
  selectedNode,
}: SidebarPanelProps) {
  const tags = Array.from(new Set(nodes.flatMap((node) => node.data.tags))).slice(0, 8);
  const taskCount = nodes.filter((node) => node.data.kind === "task").length;
  const ideaCount = nodes.filter((node) => node.data.kind === "idea").length;

  if (collapsed) {
    return (
      <aside className="sidebar is-collapsed" aria-label="Sidebar contraible">
        <button
          type="button"
          className="sidebar-toggle"
          onClick={() => onCollapsedChange(false)}
          title="Abrir sidebar"
        >
          <PanelLeftOpen size={18} aria-hidden />
        </button>
        <div className="sidebar-rail-stat" title="Notas">
          <StickyNote size={16} aria-hidden />
          <strong>{nodes.length}</strong>
        </div>
        <div className="sidebar-rail-stat" title="Conexiones">
          <Network size={16} aria-hidden />
          <strong>{edges.length}</strong>
        </div>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <strong>Workspace</strong>
        <button
          type="button"
          className="sidebar-toggle"
          onClick={() => onCollapsedChange(true)}
          title="Contraer sidebar"
        >
          <PanelLeftClose size={18} aria-hidden />
        </button>
      </div>

      <div className="sidebar-search">
        <Search size={16} aria-hidden />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Buscar"
          aria-label="Buscar notas"
        />
        {query && (
          <button type="button" onClick={() => onQueryChange("")} title="Limpiar busqueda">
            <X size={14} aria-hidden />
          </button>
        )}
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
        <div className="metric-row">
          <span>Tareas</span>
          <strong>{taskCount}</strong>
        </div>
        <div className="metric-row">
          <span>Ideas</span>
          <strong>{ideaCount}</strong>
        </div>
      </section>

      <section className="sidebar-section">
        <h2>
          <ListFilter size={15} aria-hidden /> Tipo
        </h2>
        <div className="kind-filter-list">
          {kindOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              className={kindFilter === value ? "active" : ""}
              onClick={() => onKindFilterChange(value)}
            >
              <Icon size={15} aria-hidden />
              <span>{label}</span>
            </button>
          ))}
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
