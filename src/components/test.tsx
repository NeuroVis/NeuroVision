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
            background: extraData.isPlaceholder
                ? '#eee'
                : extraData.isActive
                    ? '#4ade80' // 🟢 active = green
                    : '#ddd'    // inactive = gray
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

    const [activeNodeIds, setActiveNodeIds] = useState<string[]>([]);

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
                            ...(layerIndex === 0 && {
                                onClick: () => toggleNodeActive(nodeId),
                                isActive
                            })
                        }
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
                const sourceId = `${i}-${a}`;
                if (i === 0 && !activeNodeIds.includes(sourceId)) continue;
                for (let b = 0; b < layers[i + 1].nodes.length; b++) {
                    edges.push(createEdge(`e-${sourceId}-${i + 1}-${b}`, sourceId, `${i + 1}-${b}`, true));
                }
            }
        }
        return edges;
    }

    return (
        <div>
            <div className={"flex flex-col gap-2  w-full px-20"}>
                <div className={"flex flex-row justify-center items-center gap-3"}>
                    <Button onClick={() => addLayer()} className="rounded-full bg-indigo-950 hover:bg-indigo-600 text-white">
                        <Plus className="text-white" />
                    </Button>
                    <p className={"text-md self-center"}>HIDDEN LAYERS</p>
                    <Button onClick={() => deleteLayer()} className="rounded-full bg-indigo-950 hover:bg-indigo-600 text-white">
                        <Minus className="text-white" />
                    </Button>
                </div>
                <div className={" border-x-2 border-t-2 border-indigo-800 h-4"}></div>
            </div>
            <div style={{ width: '1000px', height: '450px' }}>
                <ReactFlow
                    nodes={generateNodesFromLayers(layers)}
                    edges={generateEdgesFromLayers(layers, activeNodeIds)} // 🆕 Pass activeNodeIds to edge generation
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
        </div>
    );
}

export default NeuralNetworkEditor;
