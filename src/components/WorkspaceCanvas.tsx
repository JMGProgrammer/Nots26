import { useCallback, useEffect, useMemo, useState, type MouseEvent } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type EdgeChange,
  type NodeChange,
  type NodeMouseHandler,
  type ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { CanvasContextMenu } from "./CanvasContextMenu";
import { NoteNode as NoteNodeComponent } from "./NoteNode";
import { EmptyState } from "./EmptyState";
import { SidebarPanel } from "./SidebarPanel";
import { Toolbar } from "./Toolbar";
import type { NoteData, NoteEdge, NoteKind, NoteNode } from "../types/note";
import { createId } from "../utils/id";
import { clearWorkspace, loadWorkspace, saveWorkspace } from "../utils/storage";

const nodeTypes = {
  note: NoteNodeComponent,
};

const defaultColor = "#6f4bd8";

interface CanvasMenuState {
  screen: { x: number; y: number };
  flow: { x: number; y: number };
}

function getDefaultTitle(kind: NoteKind, index: number) {
  if (kind === "task") {
    return `Tarea ${index}`;
  }

  if (kind === "idea") {
    return `Idea ${index}`;
  }

  return `Nota ${index}`;
}

function createNote(
  position: { x: number; y: number },
  index: number,
  kind: NoteKind = "text",
  color = defaultColor,
): NoteNode {
  return {
    id: createId("note"),
    type: "note",
    position,
    data: {
      title: getDefaultTitle(kind, index),
      content: "",
      color,
      kind,
      tags: [],
      done: false,
    },
  };
}

export function WorkspaceCanvas() {
  const initialWorkspace = useMemo(() => loadWorkspace(), []);
  const [nodes, setNodes] = useState<NoteNode[]>(initialWorkspace.nodes);
  const [edges, setEdges] = useState<NoteEdge[]>(initialWorkspace.edges);
  const [query, setQuery] = useState("");
  const [kindFilter, setKindFilter] = useState<"all" | NoteKind>("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [canvasMenu, setCanvasMenu] = useState<CanvasMenuState | null>(null);

  useEffect(() => {
    saveWorkspace({ nodes, edges });
    setLastSavedAt(new Date());
  }, [nodes, edges]);

  const updateNote = useCallback((id: string, patch: Partial<NoteData>) => {
    setNodes((current) =>
      current.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, ...patch } }
          : node,
      ),
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNodes((current) => {
      const note = current.find((node) => node.id === id);
      const shouldDelete = window.confirm(`Eliminar "${note?.data.title || "nota"}"?`);

      if (!shouldDelete) {
        return current;
      }

      setEdges((edgeState) => edgeState.filter((edge) => edge.source !== id && edge.target !== id));
      setSelectedNodeId((selected) => (selected === id ? null : selected));
      return current.filter((node) => node.id !== id);
    });
  }, []);

  const hydratedNodes = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        hidden:
          (kindFilter !== "all" && node.data.kind !== kindFilter) ||
          (query
            ? !`${node.data.title} ${node.data.content} ${node.data.tags.join(" ")}`
                .toLowerCase()
                .includes(query.toLowerCase())
            : false),
        data: {
          ...node.data,
          onUpdate: updateNote,
          onDelete: deleteNote,
        },
      })),
    [deleteNote, kindFilter, nodes, query, updateNote],
  );

  const visibleNodeIds = useMemo(
    () => new Set(hydratedNodes.filter((node) => !node.hidden).map((node) => node.id)),
    [hydratedNodes],
  );

  const hydratedEdges = useMemo(
    () =>
      edges.map((edge) => ({
        ...edge,
        animated: true,
        style: { stroke: "#7ce5ca", strokeWidth: 2.5 },
        hidden: !visibleNodeIds.has(edge.source) || !visibleNodeIds.has(edge.target),
      })),
    [edges, visibleNodeIds],
  );

  const addNote = useCallback(() => {
    setNodes((current) => {
      const offset = current.length * 36;
      return [...current, createNote({ x: 160 + offset, y: 120 + offset }, current.length + 1)];
    });
  }, []);

  const addNoteAt = useCallback((position: { x: number; y: number }, kind: NoteKind, color: string) => {
    setNodes((current) => [...current, createNote(position, current.length + 1, kind, color)]);
  }, []);

  const resetWorkspace = useCallback(() => {
    if (!window.confirm("Limpiar el workspace completo?")) {
      return;
    }

    clearWorkspace();
    setNodes([]);
    setEdges([]);
    setSelectedNodeId(null);
  }, []);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((current) => applyNodeChanges(changes, current) as NoteNode[]);
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((current) => applyEdgeChanges(changes, current));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((current) =>
      addEdge(
        {
          ...connection,
          id: createId("edge"),
          type: "smoothstep",
        },
        current,
      ),
    );
  }, []);

  const onNodeClick = useCallback<NodeMouseHandler>((_, node) => {
    setCanvasMenu(null);
    setSelectedNodeId(node.id);
  }, []);

  const openCanvasMenu = useCallback(
    (event: MouseEvent<Element>) => {
      if (!reactFlowInstance) {
        return;
      }

      const target = event.target as HTMLElement;
      if (event.type === "dblclick" && target.closest(".react-flow__node")) {
        return;
      }

      event.preventDefault();
      const flow = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      setCanvasMenu({
        screen: {
          x: Math.min(event.clientX, window.innerWidth - 236),
          y: Math.min(event.clientY, window.innerHeight - 214),
        },
        flow,
      });
      setSelectedNodeId(null);
    },
    [reactFlowInstance],
  );

  const createFromMenu = useCallback(
    (kind: NoteKind, color: string) => {
      if (!canvasMenu) {
        return;
      }

      addNoteAt(canvasMenu.flow, kind, color);
      setCanvasMenu(null);
    },
    [addNoteAt, canvasMenu],
  );

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  return (
    <div className="workspace-shell">
      <Toolbar
        noteCount={nodes.length}
        edgeCount={edges.length}
        lastSavedAt={lastSavedAt}
        onAddNote={addNote}
        onReset={resetWorkspace}
      />

      <main className={`workspace-main ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <SidebarPanel
          nodes={nodes}
          edges={edges}
          query={query}
          collapsed={sidebarCollapsed}
          kindFilter={kindFilter}
          onQueryChange={setQuery}
          onCollapsedChange={setSidebarCollapsed}
          onKindFilterChange={setKindFilter}
          selectedNode={selectedNode}
        />

        <section className="canvas-area">
          <ReactFlowProvider>
            <ReactFlow
              nodes={hydratedNodes}
              edges={hydratedEdges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onPaneClick={() => {
                setSelectedNodeId(null);
                setCanvasMenu(null);
              }}
              onPaneContextMenu={openCanvasMenu}
              onDoubleClick={openCanvasMenu}
              onInit={setReactFlowInstance}
              snapToGrid
              snapGrid={[12, 12]}
              fitView
              deleteKeyCode={["Backspace", "Delete"]}
            >
              <Background color="#8062b2" gap={24} size={1.5} variant={BackgroundVariant.Lines} />
              <Controls position="bottom-left" />
              <MiniMap
                position="bottom-right"
                nodeColor={(node) => (node.data as NoteData).color}
                maskColor="rgba(30, 16, 62, 0.64)"
              />
            </ReactFlow>
          </ReactFlowProvider>

          {!nodes.length && <EmptyState onAddNote={addNote} />}
          {canvasMenu && (
            <CanvasContextMenu
              x={canvasMenu.screen.x}
              y={canvasMenu.screen.y}
              onCreate={createFromMenu}
              onClose={() => setCanvasMenu(null)}
            />
          )}
        </section>
      </main>
    </div>
  );
}
