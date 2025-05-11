'use client';

import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ReactFlow, { Background, type Edge, type Node, Position } from 'reactflow';

import 'reactflow/dist/style.css';
import {  BackgroundVariant } from '@xyflow/react';


type NodeData = any;

type Layer = {
  id: string;
  nodes: NodeData[];
};

type State = Layer[];

const reducer = (state: State, action: any): State => {
  switch (action.type) {
    case 'ADD_LAYER': {
      const newLayer: Layer = {
        id: uuidv4(),
        nodes: []
      };
      const index = action.payload?.index;
      if (index !== undefined && index >= 0 && index <= state.length) {
        return [...state.slice(0, index), newLayer, ...state.slice(index)];
      } else {
        return [...state, newLayer];
      }
    }

    case 'DELETE_LAYER':
      return state.filter(layer => layer.id !== action.payload.layerId);

    case 'ADD_NODE':
      return state.map(layer =>
        layer.id === action.payload.layerId
          ? { ...layer, nodes: [...layer.nodes, action.payload.node] }
          : layer
      );

    case 'DELETE_NODE':
      return state.map(layer =>
        layer.id === action.payload.layerId
          ? {
            ...layer,
            nodes: layer.nodes.filter((_, i) => i !== action.payload.nodeIndex)
          }
          : layer
      );

    default:
      return state;
  }
};

const useNeuralNetwork = () => {
  const [layers, dispatch] = useReducer(reducer, []);

  const addLayer = (index?: number) => {
    dispatch({ type: 'ADD_LAYER', payload: { index } });
  };

  const deleteLayer = (layerId: string) => {
    dispatch({ type: 'DELETE_LAYER', payload: { layerId } });
  };

  const addNodeToLayer = (layerId: string, node: NodeData) => {
    dispatch({ type: 'ADD_NODE', payload: { layerId, node } });
  };

  const deleteNodeFromLayer = (layerId: string, nodeIndex: number) => {
    dispatch({ type: 'DELETE_NODE', payload: { layerId, nodeIndex } });
  };

  return {
    layers,
    addLayer,
    deleteLayer,
    addNodeToLayer,
    deleteNodeFromLayer
  };
};

function createNode(id: string, x: number, y: number, label: string = '2') {
  return {
    id,
    position: { x, y },
    data: { label },
    style: {
      borderRadius: '1000px',
      width: '40px',
      height: '40px'
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right
  };
}

function createEdge(id: string, source: string, target: string) {
  return { id, source, target };
}

const spaceBetweenNodes = 50;
const spaceBetweenLayers = 200;

function generateNodesFromLayers(layers: Layer[]) {
  const nodes: Node[] = layers.flatMap(
    (layer, layerIndex) =>
      [...layer.nodes.flatMap((node, nodeIndex) =>
        createNode(`${layerIndex}-${nodeIndex}`, layerIndex * spaceBetweenLayers, nodeIndex * spaceBetweenNodes)
      ), createNode(`placeholder-${layerIndex}`, layerIndex * spaceBetweenLayers, layer.nodes.length * spaceBetweenNodes, '+')]
  );

  return nodes;
}

function generateEdgesFromLayers(layers: Layer[]) {
  const edges: Edge[] = [];

  for (let i = 0; i < layers.length - 1; i++) {
    for (let firstLayerIndex = 0; firstLayerIndex < layers[i].nodes.length; firstLayerIndex++) {
      for (let secondLayerIndex = 0; secondLayerIndex < layers[i + 1].nodes.length; secondLayerIndex++) {
        edges.push(createEdge(`e-${i}-${firstLayerIndex}-${i + 1}-${secondLayerIndex}`, `${i}-${firstLayerIndex}`, `${i + 1}-${secondLayerIndex}`));
      }
    }
  }

  return edges;
}

const w = 3, h = 1.5;

const initialNodes: Node[] = [
  createNode('l1n1', 100 * w, 100 * h),
  createNode('l1n2', 100 * w, 150 * h),
  createNode('l1n3', 100 * w, 200 * h),
  createNode('l1n4', 100 * w, 250 * h),
  createNode('l1n5', 100 * w, 300 * h),

  createNode('l2n1', 200 * w, 125 * h),
  createNode('l2n2', 200 * w, 175 * h),
  createNode('l2n3', 200 * w, 225 * h),
  createNode('l2n4', 200 * w, 275 * h),

  createNode('l3n1', 300 * w, 100 * h),
  createNode('l3n2', 300 * w, 150 * h),
  createNode('l3n3', 300 * w, 200 * h),
  createNode('l3n4', 300 * w, 250 * h),
  createNode('l3n5', 300 * w, 300 * h)
];


const NeuralNetworkEditor: React.FC = () => {
  const {
    layers,
    addLayer,
    deleteLayer,
    addNodeToLayer,
    deleteNodeFromLayer
  } = useNeuralNetwork();

  console.log(layers);

  console.log(generateNodesFromLayers(layers), generateEdgesFromLayers(layers));

  // You can try actions here or render the structure
  return (
    <div>
      <div>
        <div style={{
          width: '700px',
          height: '600px'
        }}>

          <ReactFlow
            nodes={generateNodesFromLayers(layers)}
            edges={generateEdgesFromLayers(layers)}
            onNodesChange={() => console.log('test')}
            onEdgesChange={() => console.log('test')}
            zoomOnScroll={false}
            zoomOnPinch={false}
            panOnScroll={false}
            panOnDrag={false}
            zoomOnDoubleClick={false}
            nodesDraggable={false}
            nodesConnectable={false}
          >
            <Background variant={BackgroundVariant.Dots} />
          </ReactFlow>
        </div>
      </div>
      <button onClick={() => addLayer()}>Add Layer</button>
      <div>
        {layers.map((layer, i) => (
          <div key={layer.id} style={{ margin: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
            <p>Layer {i + 1} (ID: {layer.id})</p>
            <button onClick={() => deleteLayer(layer.id)}>Delete Layer</button>
            <button onClick={() => addNodeToLayer(layer.id, { value: Math.random() })}>Add Node</button>
            {layer.nodes.map((node, idx) => (
              <div key={idx}>
                Node {idx + 1}: {JSON.stringify(node)}
                <button onClick={() => deleteNodeFromLayer(layer.id, idx)}>Delete Node</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeuralNetworkEditor;