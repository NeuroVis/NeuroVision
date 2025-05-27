import { Layer, LayerNoID, NodeData, State } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { useReducer } from 'react';

export const useNeuralNetwork = () => {
  const [layers, dispatch] = useNetworkReducer([
    Array.from({ length: 7 }, () => ({ value: Math.random(), id: uuidv4() }))
  ]);

  const addLayer = (index?: number) => {
    dispatch({ type: 'ADD_LAYER', payload: { index } });
  };

  const deleteLayer = () => {
    dispatch({ type: 'DELETE_LAYER' });
  };

  const addNodeToLayer = (layerId: string, node: NodeData) => {
    dispatch({ type: 'ADD_NODE', payload: { layerId, node } });
  };

  const deleteNodeFromLayer = (layerId: string, nodeIndex: number) => {
    dispatch({ type: 'DELETE_NODE', payload: { layerId, nodeIndex } });
  };

  const clearLayers = () => {
    dispatch({ type: 'CLEAR_LAYERS' });
  };

  const setLayers = (layers: Layer[]) => {
    dispatch({ type: 'SET_LAYERS', payload: { layers } });
  };

  return {
    layers,
    addLayer,
    deleteLayer,
    addNodeToLayer,
    deleteNodeFromLayer,
    clearLayers,
    setLayers
  };
};

const reducer = (state: State, action: any): State => {
  switch (action.type) {
    case 'ADD_LAYER': {
      if (state.length >= 7) return state;
      const newLayer: Layer = {
        id: uuidv4(),
        nodes: [{ value: Math.random(), id: uuidv4() }]
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
      return state.map(layer => {
        if (layer.id === action.payload.layerId && layer.nodes.length < 8) {
          return { ...layer, nodes: [...layer.nodes, action.payload.node] };
        }
        return layer;
      });
    }
    case 'DELETE_NODE': {
      return state.map(layer => {
        if (layer.id === action.payload.layerId && layer.nodes.length > 1) {
          return {
            ...layer,
            nodes: layer.nodes.filter((_, i) => i !== action.payload.nodeIndex)
          };
        }
        return layer;
      });
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

export function useNetworkReducer(layers: LayerNoID[] = []){
  return useReducer(reducer,
    layers.map(layer => ({
      id: uuidv4(),
      nodes: layer
    }))
  );
}