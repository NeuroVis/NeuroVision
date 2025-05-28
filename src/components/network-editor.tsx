'use client';

import React from 'react';
import '@xyflow/react/dist/style.css';
import {
  Background,
  BackgroundVariant,
  type Edge,
  ReactFlow
} from '@xyflow/react';
import { HiddenLayer } from '@/types';
import { createEdge } from '@/lib/network-utils';
import { NetworkConfig } from '@/data/network-types';
import { PlaceholderNode } from '@/components/nodes/placeholder-node';
import { LayerControlNode } from '@/components/nodes/layer-control-node';
import { LayerConfig } from '@/components/form/layer-config';
import { usePlaygroundContext } from '@/lib/playground-context';
import {
  generateEdges,
  generateHiddenLayers,
  generateInputNodes,
  generateOutputNodes
} from '@/lib/generate-network';

const nodeTypes = {
  placeholder: PlaceholderNode,
  layerControl: LayerControlNode
};

function generateEdgesFromLayers(
  layers: HiddenLayer[],
  activeNodeIds: string[]
) {
  const edges: Edge[] = [];
  for (let i = 0; i < layers.length - 1; i++) {
    for (let a = 0; a < layers[i].nodes.length; a++) {
      const sourceId = layers[i].nodes[a].id;
      if (i === 0 && activeNodeIds.includes(sourceId)) continue;
      for (let b = 0; b < layers[i + 1].nodes.length; b++) {
        edges.push(
          createEdge(
            `e-${sourceId}-${layers[i + 1].nodes[b].id}`,
            sourceId,
            layers[i + 1].nodes[b].id,
            true
          )
        );
      }
    }
  }

  return edges;
}

function NeuralNetworkEditor({ config }: { config?: NetworkConfig }) {
  const {
    hiddenLayers,
    inputNodes,
    outputNodes,
    addLayer,
    deleteLayer,
    addNodeToLayer,
    deleteNodeFromLayer,
    toggleInputNode
  } = usePlaygroundContext();

  return (
    <div>
      <div className='space-between flex w-full flex-row gap-4'>
        <div className='flex w-[150px] flex-col gap-2'>
          <p className='text-md pl-2'>Features</p>
          <p className='text-sm'>Which properties do you want to feed in?</p>
        </div>
        <LayerConfig
          addLayer={() => {
            addLayer();
          }}
          deleteLayer={deleteLayer}
        />
      </div>
      <div style={{ width: '1000px', height: '450px' }}>
        <ReactFlow
          nodes={[
            ...generateInputNodes(inputNodes, toggleInputNode),
            ...generateOutputNodes(outputNodes, hiddenLayers.length),
            ...generateHiddenLayers(
              hiddenLayers,
              addNodeToLayer,
              deleteNodeFromLayer
            )
          ]}
          edges={generateEdges([
            inputNodes.filter((node) => node.enabled).map((node) => node.id),
            ...hiddenLayers.map((layer) => layer.nodes.map((node) => node.id)),
            outputNodes.map((node) => node.id)
          ])}
          nodeTypes={nodeTypes}
          zoomOnScroll={false}
          zoomOnPinch={false}
          panOnScroll={false}
          panOnDrag={false}
          zoomOnDoubleClick={false}
          nodesDraggable={false}
          nodesConnectable={false}
          onNodeClick={(_, node) => {
            (node.data.onClick as Function)();
          }}
        >
          <Background variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default NeuralNetworkEditor;
