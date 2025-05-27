import { type Edge, Node, Position } from 'reactflow';

export function createNode(
  id: string,
  x: number,
  y: number,
  label: any = '2',
  extraData: any = {},
  type?: string
): Node {
  const node: Node = {
    id,
    position: { x, y },
    data: { label, ...extraData },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,

  };
  if (!type || type === 'initialLayer') {
    node.style = {
      borderRadius: '1000px',
      width: '40px',
      height: '40px',
      cursor: extraData.isPlaceholder ? 'pointer' : 'default',
      background: extraData.isPlaceholder
        ? '#eee'
        : extraData.isActive
          ? '#4ade80'
          : '#ddd'
    };
  } else {
    node.type = type;
  }

  return node;
}

export function createEdge(id: string, source: string, target: string, animated: boolean): Edge {
  return { id, source, target, animated, type: 'default' };
}