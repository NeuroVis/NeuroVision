import { type Edge, Node, Position } from '@xyflow/react';

function interpolateColor(hex1: string, hex2: string, t: number): string {
  const hexToRgb = (hex: string) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16)
  ];

  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  const interpolated = rgb1.map((c1, i) => Math.round(c1 + (rgb2[i] - c1) * t));

  return (
    '#' + interpolated.map((c) => c.toString(16).padStart(2, '0')).join('')
  );
}

export function createNode(
  id: string,
  x: number,
  y: number,
  label: any = '2',
  extraData: any = {},
  type?: string,
  weight?: number
): Node {
  const node: Node = {
    id,
    position: { x, y },
    data: { label, ...extraData },
    targetPosition: Position.Left,
    sourcePosition: Position.Right
  };
  if (!type || type === 'initialLayer') {
    node.style = {
      padding: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '1000px',
      width: '40px',
      height: '40px',
      cursor: extraData.isPlaceholder ? 'pointer' : 'default',
      background: weight
        ? interpolateColor('#3729AC', '#ffdc00', weight)
        : extraData.isPlaceholder
          ? '#eee'
          : extraData.isActive
            ? '#3729AC'
            : '#ddd',
      color: extraData.isPlaceholder || !extraData.isActive ? '#000' : '#ddd'
    };
  } else {
    node.type = type;
  }

  return node;
}

export function createEdge(
  id: string,
  source: string,
  target: string,
  animated: boolean,
  weight: number
): Edge {
  return {
    id,
    source,
    target,
    animated,
    type: 'default',
    style: {
      stroke: weight > 0 ? '#3729AC' : '#ffdc00',
      strokeWidth: Math.abs(weight) * 2
    },
    data: {
      weight
    }
  };
}
