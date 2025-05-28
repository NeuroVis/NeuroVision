import {
  HiddenLayer,
  HiddenLayers,
  InputNode,
  InputNodes,
  NodeData,
  OutputNodes
} from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { useReducer } from 'react';

const hiddenLayersReducer = (
  state: HiddenLayers,
  action: any
): HiddenLayers => {
  switch (action.type) {
    case 'ADD_LAYER': {
      if (state.length >= 7) return state;
      const newLayer: HiddenLayer = {
        id: uuidv4(),
        nodes: [{ id: uuidv4() }]
      };
      const index = action.payload?.index;
      if (index !== undefined && index >= 0 && index <= state.length) {
        return [...state.slice(0, index), newLayer, ...state.slice(index)];
      } else {
        return [...state, newLayer];
      }
    }
    case 'DELETE_LAYER': {
      if (state.length <= 1) return state;
      return state.slice(0, -1);
    }
    case 'ADD_NODE': {
      return state.map((layer) => {
        if (layer.id === action.payload.layerID && layer.nodes.length < 8) {
          return { ...layer, nodes: [...layer.nodes, action.payload.node] };
        }

        return layer;
      });
    }
    case 'DELETE_NODE': {
      const layer = state.find((layer) => layer.id === action.payload.layerID)!;

      if (layer.nodes.length > 1) {
        return state.map((layer) => {
          if (layer.id === action.payload.layerID && layer.nodes.length > 1) {
            return {
              ...layer,
              nodes: layer.nodes.slice(0, -1)
            };
          }
          return layer;
        });
      } else {
        return state.filter((layer) => layer.id !== action.payload.layerID);
      }
    }
    case 'CLEAR_LAYERS': {
      return state.slice(0, 1);
    }
    case 'SET_LAYERS': {
      return action.payload.layers;
    }
    default:
      return state;
  }
};

export function useHiddenLayersReducer(layers: HiddenLayers = []) {
  return useReducer(hiddenLayersReducer, layers);
}

const outputNodesReducer = (state: OutputNodes, action: any): OutputNodes => {
  switch (action.type) {
    case 'ADD_NODE':
      return [...state, action.payload];

    case 'DELETE_NODE':
      return state.filter((node) => node.id !== action.payload.id);

    case 'EDIT_NODE':
      return state.map((node) =>
        node.id === action.payload.id
          ? { ...node, ...action.payload.data }
          : node
      );

    default:
      return state;
  }
};

export function useOutputNodesReducer(nodes: OutputNodes = []) {
  return useReducer(outputNodesReducer, nodes);
}

const inputNodesReducer = (state: InputNodes, action: any): InputNodes => {
  switch (action.type) {
    case 'ADD_NODE':
      return [...state, action.payload];

    case 'DELETE_NODE':
      return state.filter((node) => node.id !== action.payload.id);

    case 'EDIT_NODE':
      return state.map((node) =>
        node.id === action.payload.id
          ? { ...node, ...action.payload.data }
          : node
      );

    case 'TOGGLE_NODE':
      return state.map((node) =>
        node.id === action.payload.id
          ? { ...node, enabled: !node.enabled }
          : node
      );

    default:
      return state;
  }
};

export function useInputNodesReducer(nodes: InputNodes = []) {
  return useReducer(inputNodesReducer, nodes);
}

export function useNeuralNetwork() {
  const [hiddenLayers, dispatchHiddenLayers] = useHiddenLayersReducer([
    {
      id: uuidv4(),
      nodes: [
        { id: uuidv4() },
        { id: uuidv4() },
        { id: uuidv4() },
        { id: uuidv4() },
        { id: uuidv4() }
      ]
    },
    {
      id: uuidv4(),
      nodes: [
        { id: uuidv4() },
        { id: uuidv4() },
        { id: uuidv4() },
        { id: uuidv4() },
        { id: uuidv4() }
      ]
    },
    {
      id: uuidv4(),
      nodes: [
        { id: uuidv4() },
        { id: uuidv4() },
        { id: uuidv4() },
        { id: uuidv4() },
        { id: uuidv4() }
      ]
    }
  ]);

  const [inputNodes, dispatchInputNodes] = useInputNodesReducer([
    {
      enabled: true,
      feature: 'X',
      id: uuidv4()
    },
    {
      enabled: true,
      feature: 'Y',
      id: uuidv4()
    }
  ]);

  const [outputNodes, dispatchOutputNodes] = useOutputNodesReducer([
    {
      id: uuidv4()
    }
  ]);

  const addLayer = (index?: number) => {
    dispatchHiddenLayers({ type: 'ADD_LAYER', payload: { index } });
  };

  const deleteLayer = () => {
    dispatchHiddenLayers({ type: 'DELETE_LAYER' });
  };

  const addNodeToLayer = (layerID: string) => {
    dispatchHiddenLayers({
      type: 'ADD_NODE',
      payload: {
        layerID,
        node: {
          id: uuidv4()
        }
      }
    });
  };

  const deleteNodeFromLayer = (layerID: string) => {
    dispatchHiddenLayers({
      type: 'DELETE_NODE',
      payload: { layerID }
    });
  };

  const clearLayers = () => {
    dispatchHiddenLayers({ type: 'CLEAR_LAYERS' });
  };

  const setLayers = (layers: HiddenLayer[]) => {
    dispatchHiddenLayers({ type: 'SET_LAYERS', payload: { layers } });
  };

  const addInputNode = (node: InputNode) => {
    dispatchInputNodes({ type: 'ADD_NODE', payload: node });
  };

  const deleteInputNode = (id: string) => {
    dispatchInputNodes({ type: 'DELETE_NODE', payload: { id } });
  };

  const editInputNode = (id: string, data: Partial<InputNode>) => {
    dispatchInputNodes({ type: 'EDIT_NODE', payload: { id, data } });
  };

  const toggleInputNode = (id: string) => {
    dispatchInputNodes({ type: 'TOGGLE_NODE', payload: { id } });
  };

  const addOutputNode = (node: NodeData) => {
    dispatchOutputNodes({ type: 'ADD_NODE', payload: node });
  };

  const deleteOutputNode = (id: string) => {
    dispatchOutputNodes({ type: 'DELETE_NODE', payload: { id } });
  };

  const editOutputNode = (id: string, data: Partial<NodeData>) => {
    dispatchOutputNodes({ type: 'EDIT_NODE', payload: { id, data } });
  };

  return {
    hiddenLayers,
    inputNodes,
    outputNodes,
    addLayer,
    deleteLayer,
    addNodeToLayer,
    deleteNodeFromLayer,
    clearLayers,
    setLayers,
    addInputNode,
    deleteInputNode,
    editInputNode,
    toggleInputNode,
    addOutputNode,
    deleteOutputNode,
    editOutputNode
  };
}
