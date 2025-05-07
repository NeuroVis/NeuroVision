'use client';

import React, { useCallback } from 'react';
import {
    ReactFlow,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Node,
    Edge, BackgroundVariant,
} from '@xyflow/react';
import 'reactflow/dist/style.css';
import {Minus, Plus} from "lucide-react";
import NeuralNetworkFlow from "@/components/test";

const initialNodes: Node[] = [
    { id: 'x1', type: 'input', position: { x: 0, y: 100 }, data: { label: 'X₁' }, draggable: false , height:70, width:70, hidden: false},
    { id: 'x2', type: 'input', position: { x: 0, y: 200 }, data: { label: 'X₂' }, draggable: false , height:70, width:70, hidden: false},
    { id: 'x3', type: 'input', position: { x: 0, y: 300 }, data: { label: 'X3' }, draggable: false , height:70, width:70, hidden: false},
    { id: 'x4', type: 'input', position: { x: 0, y: 400 }, data: { label: 'X4' }, draggable: false , height:70, width:70, hidden: false},
    { id: 'x5', type: 'input', position: { x: 0, y: 500 }, data: { label: 'X5' }, draggable: false , height:70, width:70, hidden: false},
    { id: 'x6', type: 'input', position: { x: 0, y: 600 }, data: { label: 'X6' }, draggable: false , height:70, width:70, hidden: false},
    { id: 'x7', type: 'input', position: { x: 0, y: 700 }, data: { label: 'X7' }, draggable: false , height:70, width:70, hidden: false},
];

const initialEdges: Edge[] = [
];

export default function Neuron() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Edge | any) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
        [setEdges]
    );

    return (
        <div className="w-[100px] h-[450px]">
            <div className={"flex flex-col"}>
                <div className={"flex flex-row justify-between"}>
                    <div className={"flex flex-col gap-2 w-[160px]"}>
                        <p className={"text-md pl-2"}>FEATURES</p>
                        <p className={"text-sm"}>Which properties do you want to feed in?</p>
                    </div>
                    <ReactFlow className={""}
                               nodes={nodes}
                               edges={edges}
                               onNodesChange={onNodesChange}
                               onEdgesChange={onEdgesChange}
                               onConnect={onConnect}
                               zoomOnScroll={false}
                               zoomOnPinch={false}
                               panOnScroll={false}
                               panOnDrag={false}
                               zoomOnDoubleClick={false}
                               nodesDraggable={false}
                               nodesConnectable={false}
                               fitView
                    >
                        <Background variant={BackgroundVariant.Lines}/>
                    </ReactFlow>
                    <div className={"flex flex-row gap-2"}>
                        <Plus className={"rounded-full bg-indigo-100 hover:bg-indigo-200"}/>
                        <Minus className={"rounded-full bg-indigo-100 hover:bg-indigo-200"}/>
                        <p className={"text-md pl-2"}>HIDDEN LAYERS</p>
                    </div>
                </div>
            </div>

            <ReactFlow className={""}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                zoomOnScroll={false}
                zoomOnPinch={false}
                panOnScroll={false}
                panOnDrag={false}
                zoomOnDoubleClick={false}
                nodesDraggable={false}
                nodesConnectable={false}
                fitView
            >
                <Background variant={BackgroundVariant.Lines}/>
            </ReactFlow>
        </div>
    );
}
