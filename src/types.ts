export type NodeData = any;

export type Layer = {
  id: string;
  nodes: NodeData[];
};

export type LayerNoID = NodeData[];

export type State = Layer[];