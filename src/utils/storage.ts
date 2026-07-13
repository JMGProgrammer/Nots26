import type { NoteNode, WorkspaceState } from "../types/note";

const STORAGE_KEY = "nots26.workspace.v1";

function serializeNodes(nodes: NoteNode[]): NoteNode[] {
  return nodes.map((node) => ({
    ...node,
    data: {
      title: node.data.title,
      content: node.data.content,
      color: node.data.color,
      kind: node.data.kind,
      tags: node.data.tags,
      done: node.data.done,
    },
  }));
}

export function loadWorkspace(): WorkspaceState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return { nodes: [], edges: [] };
    }

    const parsed = JSON.parse(raw) as WorkspaceState;

    return {
      nodes: Array.isArray(parsed.nodes) ? parsed.nodes : [],
      edges: Array.isArray(parsed.edges) ? parsed.edges : [],
    };
  } catch {
    return { nodes: [], edges: [] };
  }
}

export function saveWorkspace(workspace: WorkspaceState) {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      nodes: serializeNodes(workspace.nodes),
      edges: workspace.edges,
    }),
  );
}

export function clearWorkspace() {
  window.localStorage.removeItem(STORAGE_KEY);
}
