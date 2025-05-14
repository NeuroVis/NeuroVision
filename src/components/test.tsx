'use client';

import React, { useReducer } from 'react';
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
import {Minus, Plus} from "lucide-react";



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
                nodes: [{ value: Math.random() }]
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
                layer.id === action.payload.layerId && layer.nodes.length < 8
                    ? { ...layer, nodes: [...layer.nodes, action.payload.node] }
                    : layer
            );
        case 'DELETE_NODE':
            return state.map(layer =>
                layer.id === action.payload.layerId && layer.nodes.length > 1
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


function createNode(id: string, x: number, y: number, label: any = '2', extraData: any = {}, type?: string): Node {
    return {
        id,
        type,
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
}

function createEdge(id: string, source: string, target: string, animated:boolean): Edge {
    return { id, source, target , animated};
}

const PlaceholderNode: React.FC<NodeProps> = ({ data }) => (
    <div
        style={{
            background: '#f5f5f5',
            border: '1px solid #ccc',
            borderRadius: '1000px',
            fontSize: '16px '
        }}
        className="flex justify-center items-center rounded-full"
    >
        <button
            style={{
                padding: ' ',
                fontSize: '16px',
                backgroundColor: '#ff6961',
                border: 'none',
                borderRadius: '1000px',
                color: 'white',
                cursor: 'pointer'
            }}
            onClick={data.onClick}
        ><Plus className={"rounded-full text-black bg-indigo-100 hover:bg-indigo-200 p-1"} style={{width: '36px', height: '36px'}}/>
        </button>
    </div>
);

const LayerControlNode: React.FC<NodeProps> = ({ data }) => {
    return (
        <div
            style={{
                background: '#f5f5f5',
                border: '1px solid #ccc',
                borderRadius: '1000px',
                fontSize: '16px '
            }}
            className="flex justify-center items-center rounded-full"
        >
            <button
                style={{
                    padding: ' ',
                    fontSize: '16px',
                    backgroundColor: '#ff6961',
                    border: 'none',
                    borderRadius: '1000px',
                    color: 'white',
                    cursor: 'pointer'
                }}
                onClick={data.onClick}
            ><Minus className={" rounded-full text-black bg-indigo-100 hover:bg-indigo-200 p-1"} width={36} height={36} style={{width: '36x', height: '36px'}}/>
            </button>
        </div>
    );
};

const nodeTypes = {
    placeholder: PlaceholderNode,
    layerControl: LayerControlNode
};

const spaceBetweenNodes = 50;
const spaceBetweenLayers = 140;

function NeuralNetworkEditor() {
    const {
        layers,
        addLayer,
        deleteLayer,
        addNodeToLayer,
        deleteNodeFromLayer
    } = useNeuralNetwork();

    function generateNodesFromLayers(layers: Layer[]) {
        const nodes: Node[] = [];

        layers.forEach((layer, layerIndex) => {
            const layerX = layerIndex * spaceBetweenLayers;

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


            layer.nodes.forEach((_, nodeIndex) => {
                const yPosition = (nodeIndex + 1) * spaceBetweenNodes;
                nodes.push(createNode(`${layerIndex}-${nodeIndex}`, layerX, yPosition));
            });


            if(layer.nodes.length <8) {

                nodes.push(
                createNode(
                    `placeholder-${layerIndex}`,
                    layerX,
                    (layer.nodes.length + 1) * spaceBetweenNodes,
                    <Plus className={"rounded-full text-black bg-indigo-100 hover:bg-indigo-200 p-1 te"} style={{width: '36px', height: '36px'}} />,
                    {
                        isPlaceholder: true,
                        layerId: layer.id
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
                for (let b = 0; b < layers[i + 1].nodes.length; b++) {
                    edges.push(createEdge(`e-${i}-${a}-${i + 1}-${b}`, `${i}-${a}`, `${i + 1}-${b}`, true));
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
                    onNodeClick={(_, node) => {
                        if (node.data?.isPlaceholder && node.data?.layerId) {
                            addNodeToLayer(node.data.layerId, { value: Math.random() });
                        }
                    }}
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
            <button onClick={() => addLayer()} disabled={layers.length==6}>Add Layer</button>
        </div>
    );
}

export default NeuralNetworkEditor;

///
