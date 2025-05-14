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
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';


type NodeData = any;

type Layer = {
    id: string;
    nodes: NodeData[];
};

type State = Layer[];


const reducer = (state: State, action: any): State => {
    switch (action.type) {
        case 'ADD_LAYER': {
            if (state.length >= 6) return state;
            const newLayer: Layer = {
                id: uuidv4(),
                nodes: [{ value: Math.random() }]
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


    const useNeuralNetwork = () => {
    const [layers, dispatch] = useReducer(reducer, [
        {
            id: uuidv4(),
            nodes: Array.from({ length: 7 }, () => ({ value: Math.random() }))
        }
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

function createNode(id: string, x: number, y: number, label: any = '2', extraData: any = {}, type?: string): Node {
    const node: Node = {
        id,
        position: { x, y },
        data: { label, ...extraData },
        style: {
            borderRadius: '1000px',
            width: '40px',
            height: '40px',
            cursor: extraData.isPlaceholder ? 'pointer' : 'default',
            background: extraData.isPlaceholder ? '#eee' : undefined
        },
        targetPosition: Position.Left,
        sourcePosition: Position.Right
    };

    if (type) {
        node.type = type;
    }

    return node;
}

function createEdge(id: string, source: string, target: string, animated: boolean): Edge {
    return { id, source, target, animated, type: 'default' };
}

const PlaceholderNode: React.FC<NodeProps> = ({ data }) => (
    <div className="flex justify-center items-center rounded-full bg-gray-100 border border-gray-300">
        <Button
            variant="ghost"
            className="rounded-full p-1 w-10 h-10 hover:bg-indigo-200"
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
    <div className="flex justify-center items-center rounded-full bg-gray-100 border border-gray-300">
        <Button
            variant="ghost"
            className="rounded-full p-1 w-10 h-10 hover:bg-indigo-200"
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

    const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

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
                nodes.push(
                    createNode(
                        nodeId,
                        layerX,
                        yPosition,
                        '2',
                        layerIndex === 0
                            ? {
                                onClick: () => setActiveNodeId(nodeId)
                            }
                            : {}
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

    function generateEdgesFromLayers(layers: Layer[]) {
        const edges: Edge[] = [];
        for (let i = 0; i < layers.length - 1; i++) {
            for (let a = 0; a < layers[i].nodes.length; a++) {
                const sourceId = `${i}-${a}`;
                if (i === 0 && sourceId !== activeNodeId) continue;
                for (let b = 0; b < layers[i + 1].nodes.length; b++) {
                    edges.push(createEdge(`e-${i}-${a}-${i + 1}-${b}`, sourceId, `${i + 1}-${b}`, true));
                }
            }
        }
        return edges;
    }

    return (
        <div>
            <div style={{ width: '1000px', height: '450px' }}>
                <ReactFlow
                    nodes={generateNodesFromLayers(layers)}
                    edges={generateEdgesFromLayers(layers)}
                    nodeTypes={nodeTypes}
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
            <div className="mt-4 flex gap-2">
                <Button onClick={() => addLayer()} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Add Layer
                </Button>
                <Button onClick={() => deleteLayer()} className="bg-red-600 hover:bg-red-700 text-white">
                    Remove Layer
                </Button>
            </div>
        </div>
    );
}

export default NeuralNetworkEditor;
