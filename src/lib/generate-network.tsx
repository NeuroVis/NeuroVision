import { HiddenLayers, InputNodes, OutputNodes } from '@/types';
import { type Edge, type Node, Position } from '@xyflow/react';
import { createEdge, createNode } from '@/lib/network-utils';
import { Plus } from 'lucide-react';
import React from 'react';

const spaceBetweenNodes = 50;
const spaceBetweenLayers = 150;

export function generateInputNodes(
  inputNodes: InputNodes,
  toggleNode: (nodeID: string) => void
): Node[] {
  return inputNodes.map((node, index) => ({
    id: node.id,
    position: { x: 0, y: spaceBetweenNodes * (index + 1) },
    sourcePosition: Position.Right,
    targetPosition: Position.Right,
    data: {
      label: node.feature,
      onClick() {
        toggleNode(node.id);
      }
    },
    style: {
      borderRadius: '1000px',
      width: '40px',
      height: '40px',
      cursor: node.enabled ? 'pointer' : 'not-allowed',
      background: node.enabled ? '#3729AC' : '#ddd',
      color: node.enabled ? '#ddd' : '#000'
    }
  }));
}

export function generateOutputNodes(
  outputNodes: OutputNodes,
  hiddenLayersCnt: number
): Node[] {
  return outputNodes.map((node, index) => ({
    id: node.id,
    position: {
      x: (hiddenLayersCnt + 1) * spaceBetweenLayers,
      y: (index + 1) * spaceBetweenNodes
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Left,
    data: { label: `Out` },
    style: {
      borderRadius: '1000px',
      width: '40px',
      height: '40px',
      background: '#3729AC',
      color: '#ddd'
    }
  }));
}

export function generateHiddenLayers(
  hiddenLayers: HiddenLayers,
  addNodeToLayer: (layer: string) => void,
  deleteNodeFromLayer: (layer: string) => void,
  activations: number[][][]
): Node[] {
  return hiddenLayers.flatMap((layer, layerIndex) => {
    const layerX = (layerIndex + 1) * spaceBetweenLayers;

    return [
      createNode(
        layer.id,
        layerX,
        0,
        '',
        {
          onClick: () => {
            deleteNodeFromLayer(layer.id);
          }
        },
        'layerControl'
      ),
      ...layer.nodes.flatMap((node, nodeIndex) => {
        const yPosition = (nodeIndex + 1) * spaceBetweenNodes;

        return createNode(
          node.id,
          layerX,
          yPosition,
          (
            activations[layerIndex][nodeIndex]?.reduce((x, S) => x + S, 0) /
            activations[layerIndex][nodeIndex]?.length
          ).toFixed(2)
        );
      }),
      createNode(
        `placeholder-${layerIndex}`,
        layerX,
        (layer.nodes.length + 1) * spaceBetweenNodes,
        <Plus className='text-black' />,
        {
          isPlaceholder: true,
          layerId: layer.id,
          onClick: () => {
            addNodeToLayer(layer.id);
          }
        },
        'placeholder'
      )
    ];
  });
}

export function generateEdges(layers: string[][], activations: number[][][]) {
  const edges: Edge[] = [];
  for (let i = 1; i < layers.length; i++) {
    for (let a = 0; a < layers[i].length; a++) {
      const sourceId = layers[i][a];
      for (let b = 0; b < layers[i - 1].length; b++) {
        edges.push(
          createEdge(
            `e-${sourceId}-${layers[i - 1][b]}`,
            layers[i - 1][b],
            sourceId,
            true,
            activations[i]?.[a]?.[b] || 1
          )
        );
      }
    }
  }

  return edges;
}
