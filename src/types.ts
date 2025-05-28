export type NodeData = {
  id: string;
};

export interface InputNode {
  id: string;
  enabled: boolean;
  feature: string;
}

export interface OutputNode {
  id: string;
}

export type HiddenLayer = {
  id: string;
  nodes: NodeData[];
};

export type HiddenLayers = HiddenLayer[];
export type InputNodes = InputNode[];
export type OutputNodes = OutputNode[];

export interface NetworkState {
  hiddenLayers: HiddenLayers;
  inputNodes: InputNodes;
  outputNodes: OutputNodes;
}
