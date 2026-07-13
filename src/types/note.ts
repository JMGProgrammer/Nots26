import type { Edge, Node } from "reactflow";

export type NoteKind = "text" | "task" | "idea";

export interface NoteData {
  title: string;
  content: string;
  color: string;
  kind: NoteKind;
  tags: string[];
  done?: boolean;
  onUpdate?: (id: string, patch: Partial<NoteData>) => void;
  onDelete?: (id: string) => void;
}

export type NoteNode = Node<NoteData, "note">;
export type NoteEdge = Edge;

export interface WorkspaceState {
  nodes: NoteNode[];
  edges: NoteEdge[];
}
