'use client';

import React, { useReducer, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ReactFlow, {
  Background,
  type Edge,
  type Node,
  Position,
  NodeProps
} from 'reactflow';

import 'reactflow/dist/style.css';
import { BackgroundVariant } from '@xyflow/react';
import { ArrowDownNarrowWide, ArrowUpWideNarrow, Diamond, Dot, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Layer } from '@/types';
import { useNeuralNetwork } from '@/lib/network-reducer';
import { createEdge, createNode } from '@/lib/network-utils';

const PlaceholderNode: React.FC<NodeProps> = ({ data }) => (
  <div className="flex justify-center items-center rounded-full bg-indigo-200 border border-gray-300">
    <Button
      variant="ghost"
      className="rounded-full p-1 w-10 h-10 hover:bg-indigo-300"
      onClick={(e) => {
        e.stopPropagation();
        data.onClick();
      }}
    >
      <Plus className="text-black" />
    </Button>
  </div>
);

const LayerControlNode: React.FC<NodeProps> = ({ data }) => (
  <div className="flex justify-center items-center rounded-full bg-indigo-200 border border-gray-300">
    <Button
      variant="ghost"
      className="rounded-full p-1 w-10 h-10 hover:bg-indigo-300"
      onClick={(e) => {
        e.stopPropagation();
        data.onClick();
      }}
    >
      <Minus className="text-black" />
    </Button>
  </div>
);

const nodeTypes = {
  placeholder: PlaceholderNode,
  layerControl: LayerControlNode
};

const spaceBetweenNodes = 50;
const spaceBetweenLayers = 150;

function NeuralNetworkEditor() {
  const {
    layers,
    addLayer,
    deleteLayer,
    addNodeToLayer,
    deleteNodeFromLayer,
    clearLayers,
    setLayers
  } = useNeuralNetwork();

  const [activeNodeIds, setActiveNodeIds] = useState<string[]>([layers[0].nodes[0].id, layers[0].nodes[1].id]);
  console.log(activeNodeIds);
  const toggleNodeActive = (id: string) => {
    setActiveNodeIds(prev =>
      prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
    );
  };


  function generateNodesFromLayers(layers: Layer[]) {
    const nodes: Node[] = [];

    layers.forEach((layer, layerIndex) => {
      const layerX = layerIndex * spaceBetweenLayers;

      if (layerIndex !== 0) {
        nodes.push(
          createNode(
            `control-${layerIndex}`,
            layerX,
            0,
            '',
            {
              onClick: () => {
                const lastIndex = layer.nodes.length - 1;
                if (lastIndex >= 0) {
                  deleteNodeFromLayer(layer.id, lastIndex);
                }
              }
            },
            'layerControl'
          )
        );
      }

      layer.nodes.forEach((_, nodeIndex) => {
        const nodeId = `${layerIndex}-${nodeIndex}`;
        const yPosition = (nodeIndex + 1) * spaceBetweenNodes;
        const isActive = activeNodeIds.includes(nodeId);


        nodes.push(
          createNode(
            nodeId,
            layerX,
            yPosition,
            '2',
            {
              onClick: () => {
                if (layerIndex === 0) {
                  toggleNodeActive(nodeId);
                }
              },
              isActive
            },
            layerIndex === 0 ? 'initialLayer' : undefined
          )
        );
      });

      if (layerIndex !== 0 && layer.nodes.length < 8) {
        nodes.push(
          createNode(
            `placeholder-${layerIndex}`,
            layerX,
            (layer.nodes.length + 1) * spaceBetweenNodes,
            <Plus className="text-black" />,
            {
              isPlaceholder: true,
              layerId: layer.id,
              onClick: () => addNodeToLayer(layer.id, { value: Math.random() })
            },
            'placeholder'
          )
        );
      }
    });

    return nodes;
  }

  function generateEdgesFromLayers(layers: Layer[], activeNodeIds: string[]) {
    const edges: Edge[] = [];
    for (let i = 0; i < layers.length - 1; i++) {
      for (let a = 0; a < layers[i].nodes.length; a++) {
        const sourceId = layers[i].nodes[a].id;
        if (i === 0 && activeNodeIds.includes(sourceId)) continue;
        for (let b = 0; b < layers[i + 1].nodes.length; b++) {
          edges.push(createEdge(`e-${sourceId}-${i + 1}-${b}`, sourceId, `${i + 1}-${b}`, true));
        }
      }
    }
    return edges;
  }

  return (
    <div>
      <div className={'flex flex-row gap-4 space-between w-full '}>
        <Dialog>
          <DialogTrigger className={'text-start'}>
            <div className={'flex flex-col gap-2 w-[150px]'}>
              <p className={'text-md pl-2'}>FEATURES</p>
              <p className={'text-sm'}>Which properties do you want to feed in?</p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Features</DialogTitle>
              <DialogDescription className={'text-black text-[14px]'}>
                Features are the inputs you give to your neural network — the properties or
                transformations of data that help the model learn patterns.
                <br />
                In NeuroVision, you can choose which features to include in the training process. Here's
                what each option means:
                <br /><br />
                <div className={'flex flex-col gap-1'}>
                  <div className={'flex flex-row align-middle gap-1 '}>
                    <Diamond className={'mt-2 ml-2'} width={10} height={10} color={'indigo'}
                             fill={'indigo'} />
                    <span className={'font-semibold'}>X₁ and X₂</span>
                  </div>
                  <div className={'flex flex-row gap-2'}>
                    <Dot />
                    The basic input variables.
                  </div>
                  <div className={'flex flex-row gap-2'}>
                    <Dot />
                    Think of them as two dimensions of data (e.g., height and weight, or x and y
                    coordinates).
                  </div>

                  <div className={'flex flex-row align-middle gap-2'}>
                    <Diamond className={'mt-2 ml-2'} width={10} height={10} color={'indigo'}
                             fill={'indigo'} />
                    <span className={'font-semibold'}>X₁² and X₂² (squared features)</span>
                  </div>
                  <div className={'flex flex-row gap-2'}>
                    <Dot />
                    These represent the square of each input.
                  </div>
                  <div className={'flex flex-row gap-2'}>
                    <Dot />
                    They allow the network to learn curved or nonlinear patterns in the data.
                  </div>

                  <div className={'flex flex-row align-middle gap-2'}>
                    <Diamond className={'mt-2 ml-2'} width={10} height={10} color={'indigo'}
                             fill={'indigo'} />
                    <span className={'font-semibold'}>X₁ × X₂ (interaction term)</span>
                  </div>
                  <div className={'flex flex-row gap-2'}>
                    <Dot />
                    This is the product of the two inputs.
                  </div>
                  <div className={'flex flex-row gap-2'}>
                    <Dot />
                    Helps the network capture how the two inputs influence each other when combined.
                  </div>

                  <div className={'flex flex-row align-middle gap-2'}>
                    <Diamond className={'mt-2 ml-2'} width={10} height={10} color={'indigo'}
                             fill={'indigo'} />
                    <span className={'font-semibold'}>sin(X₁) and sin(X₂)</span>
                  </div>
                  <div className={'flex flex-row gap-2'}>
                    <Dot />
                    These apply the sine function to the inputs.
                  </div>
                  <div className={'flex flex-row gap-2'}>
                    <Dot />
                    Great for learning periodic or wave-like patterns, such as signals or
                    oscillations.
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div className={'flex flex-col w-[760px] gap-1'}>
          <div className={'flex flex-row justify-center items-center gap-3'}>
            <Button onClick={addLayer}
                    className="rounded-full h-10 bg-indigo-950 hover:bg-indigo-600 text-white">
              <Plus className="text-white" />
            </Button>

            <Dialog>
              <DialogTrigger className={'text-start'}>
                <p className={'text-md self-center'}>HIDDEN LAYERS</p>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle> Hidden Layers</DialogTitle>
                  <DialogDescription className={'text-black text-[14px]'}>
                    <ScrollArea className={'h-[400px]'}>
                      <br /><ArrowDownNarrowWide color={'gray'} className={'float-right mr-2'} />
                      <span
                        className={'font-semibold'}>How does a neural network “think”?</span><br />
                      Hidden layers are where the real learning happens.
                      <br />
                      They transform the input features into more abstract representations - layer
                      by layer - to solve complex problems.
                      <br /><br />
                      <div className={'flex flex-col gap-1'}>
                        <div className={'flex flex-row align-middle gap-1 '}>
                          <Diamond className={'mt-2 ml-2'} width={10} height={10}
                                   color={'indigo'}
                                   fill={'indigo'} />
                          <span className={'font-semibold'}>What is a Hidden Layer?</span>
                        </div>
                        <div className={'flex flex-row gap-2'}>
                          <Dot />
                          A hidden layer is a group of neurons that sits between the input and
                          output layers.
                        </div>
                        <div className={'flex flex-row gap-2'}>
                          <Dot />
                          Each neuron receives inputs, applies a weight, adds a bias, and
                          passes the result through an activation function.
                        </div>
                        <div className={'flex flex-row gap-2'}>
                          <Dot />
                          The connections between layers allow the network to learn patterns
                          in the data.
                        </div>
                        <br />
                        <div className={'flex flex-row align-middle gap-2'}>
                          <Diamond className={'mt-2 ml-2'} width={10} height={10}
                                   color={'indigo'}
                                   fill={'indigo'} />
                          <span
                            className={'font-semibold'}> Customizing the Architecture</span>
                        </div>
                        You can fully customize the shape of your neural network:
                        <div className={'flex flex-row gap-2'}>
                          <Dot />
                          Up to 6 hidden layers
                        </div>
                        <div className={'flex flex-row gap-2'}>
                          <Dot />
                          Up to 8 neurons per layer
                        </div>
                        This gives you control over the network’s capacity (how much it can
                        learn) and complexity (how deep the representation goes).

                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[230px]">Setting</TableHead>
                              <TableHead className="text-left">Description</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <div className={'flex flex-row gap-2'}>
                                  <Plus color={'indigo'} />Add Layer
                                </div>
                              </TableCell>
                              <TableCell>
                                Adds a new layer to increase model depth (more
                                abstraction).
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <div className={'flex flex-row gap-2'}>
                                  <Minus color={'indigo'} />Remove Layer
                                </div>
                              </TableCell>
                              <TableCell>
                                Reduces depth, simplifying the model and reducing
                                computation.
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <div className={'flex flex-row gap-2'}>
                                  <Plus color={'indigo'} />/
                                  <Minus color={'indigo'} />Neurons
                                </div>
                              </TableCell>
                              <TableCell>
                                Increase or decrease the number of neurons in a specific
                                layer (more neurons = more feature capacity).
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        <br />
                        <div className={'flex flex-row align-middle gap-2'}>
                          <Diamond className={'mt-2 ml-2'} width={10} height={10}
                                   color={'indigo'}
                                   fill={'indigo'} />
                          <span className={'font-semibold'}>Visual Feedback</span>
                        </div>
                        <div className={'flex flex-row gap-2'}>
                          <Dot />
                          Line Thickness: Represents the strength (weight) of the connection.
                        </div>
                        <div className={'flex flex-row gap-2'}>
                          <Dot />
                          Color: Blue = negative weight, Orange = positive weight.
                        </div>
                        <div className={'flex flex-row gap-2'}>
                          <Dot />
                          The way the connections thicken or thin over time shows you how the
                          network is learning to emphasize or ignore certain paths.
                        </div>
                        <br />
                        <div className={'flex flex-row align-middle gap-2'}>
                          <Diamond className={'mt-2 ml-2'} width={10} height={10}
                                   color={'indigo'}
                                   fill={'indigo'} />
                          <span className={'font-semibold'}> Tips for Experimenting:</span>
                        </div>
                        <div className={'flex flex-row gap-2'}>
                          <Dot />
                          Use fewer layers for simple datasets (like the Plane).
                        </div>
                        <div className={'flex flex-row gap-2'}>
                          <Dot />
                          Use more layers and neurons for complex data (like Multi-Gaussian).
                        </div>
                        <div className={'flex flex-row gap-2'}>
                          <Dot />
                          Too many layers or neurons without regularization can lead to
                          overfitting.
                        </div>
                      </div>
                      <br /><ArrowUpWideNarrow color={'gray'} className={'float-right mr-2'} />
                    </ScrollArea>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Button onClick={() => deleteLayer()}
                    className="rounded-full h-10 bg-indigo-950 hover:bg-indigo-600 text-white">
              <Minus className="text-white" />
            </Button>
          </div>
          <div className={' border-x-2 border-t-2 border-indigo-800 h-4'}></div>
        </div>
      </div>
      <div style={{ width: '1000px', height: '450px' }}>
        <ReactFlow
          nodes={generateNodesFromLayers(layers)}
          edges={generateEdgesFromLayers(layers, activeNodeIds)}
          nodeTypes={nodeTypes}
          zoomOnScroll={false}
          zoomOnPinch={false}
          panOnScroll={false}
          panOnDrag={false}
          zoomOnDoubleClick={false}
          nodesDraggable={false}
          nodesConnectable={false}
          onNodeClick={(event, node) => {
            node.data.onClick();
          }}
        >
          <Background variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default NeuralNetworkEditor;
