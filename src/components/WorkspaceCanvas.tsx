import { useCallback, useEffect, useMemo, useState } from "react";
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
} from "reactflow";
import "reactflow/dist/style.css";
import { NoteNode as NoteNodeComponent } from "./NoteNode";
import { EmptyState } from "./EmptyState";
import { SidebarPanel } from "./SidebarPanel";
import { Toolbar } from "./Toolbar";
import type { NoteData, NoteEdge, NoteNode } from "../types/note";
import { createId } from "../utils/id";
import { clearWorkspace, loadWorkspace, saveWorkspace } from "../utils/storage";

const nodeTypes = {
  note: NoteNodeComponent,
};

const defaultColor = "#6f4bd8";

function createNote(position: { x: number; y: number }, index: number): NoteNode {
  return {
    id: createId("note"),
    type: "note",
    position,
    data: {
      title: `Nota ${index}`,
      content: "",
      color: defaultColor,
      kind: "text",
      tags: [],
    },
  };
}

export function WorkspaceCanvas() {
  const initialWorkspace = useMemo(() => loadWorkspace(), []);
  const [nodes, setNodes] = useState<NoteNode[]>(initialWorkspace.nodes);
  const [edges, setEdges] = useState<NoteEdge[]>(initialWorkspace.edges);
  const [query, setQuery] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

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
        hidden: query
          ? !`${node.data.title} ${node.data.content} ${node.data.tags.join(" ")}`
              .toLowerCase()
              .includes(query.toLowerCase())
          : false,
        data: {
          ...node.data,
          onUpdate: updateNote,
          onDelete: deleteNote,
        },
      })),
    [deleteNote, nodes, query, updateNote],
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
    setSelectedNodeId(node.id);
  }, []);

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

      <main className="workspace-main">
        <SidebarPanel
          nodes={nodes}
          edges={edges}
          query={query}
          onQueryChange={setQuery}
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
              onPaneClick={() => setSelectedNodeId(null)}
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
        </section>
      </main>
    </div>
  );
}
