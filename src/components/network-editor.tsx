'use client';

import React from 'react';
import '@xyflow/react/dist/style.css';
import { Background, BackgroundVariant, ReactFlow } from '@xyflow/react';
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
import { getFFNNWeights } from '@/lib/generate-model';

const nodeTypes = {
  placeholder: PlaceholderNode,
  layerControl: LayerControlNode
};

function NeuralNetworkEditor({ config }: { config?: NetworkConfig }) {
  const {
    hiddenLayers,
    inputNodes,
    outputNodes,
    addLayer,
    deleteLayer,
    addNodeToLayer,
    deleteNodeFromLayer,
    toggleInputNode,
    modelRef
  } = usePlaygroundContext();

  const activations = getFFNNWeights(modelRef.current!);

  return (
    <div>
      <div className='space-between flex w-full flex-row gap-4'>
        <div className='flex w-[150px] flex-col gap-2'>
          <p className='text-md pl-2'>Features</p>
          <p className='text-sm'>Which properties do you want to feed in?</p>
        </div>
        <LayerConfig
          addLayer={() => {
            if (hiddenLayers.length < 4) {
              addLayer();
            }
          }}
          deleteLayer={deleteLayer}
        />
      </div>
      <div className='h-[450px] w-full max-w-screen'>
        <ReactFlow
          nodes={[
            ...generateInputNodes(inputNodes, toggleInputNode),
            ...generateOutputNodes(outputNodes, hiddenLayers.length),
            ...generateHiddenLayers(
              hiddenLayers,
              addNodeToLayer,
              deleteNodeFromLayer,
              activations
            )
          ]}
          edges={generateEdges(
            [
              inputNodes.filter((node) => node.enabled).map((node) => node.id),
              ...hiddenLayers.map((layer) =>
                layer.nodes.map((node) => node.id)
              ),
              outputNodes.map((node) => node.id)
            ],
            activations
          )}
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
