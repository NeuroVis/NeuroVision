import {useCallback} from 'react';
import ReactFlow, {addEdge, Background, type Edge, type Node, Position, useEdgesState, useNodesState,} from 'reactflow';

import 'reactflow/dist/style.css';
import {BackgroundVariant} from "@xyflow/react";

function createNode(id: string, x: number, y: number) {
    return {
        id,
        position: {x, y},
        data: {label: 2},
        style: {
            borderRadius: '1000px',
            width: '40px',
            height: '40px'
        },
        targetPosition: Position.Left,
        sourcePosition: Position.Right
    }
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

const initialEdges: Edge[] = [
    ...['l1n1', 'l1n2', 'l1n3', 'l1n4', 'l1n5'].flatMap(node => [
        {
            id: 'e1-2', source: node, target: 'l2n1', animated: true, style: {
                stroke: 'red',
                strokeWidth: 5
            }
        },
        {id: 'e1-2', source: node, target: 'l2n2'},
        {id: 'e1-2', source: node, target: 'l2n3'},
        {id: 'e1-2', source: node, target: 'l2n4'}
    ])
];

export default function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <div style={{
            width: '700px',
            height: '600px'
        }}>

            <ReactFlow
                style={{
                    width: '800px',
                    height: '800px'
                }}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                zoomOnScroll={false}
                zoomOnPinch={false}
                panOnScroll={false}
                panOnDrag={false}
                zoomOnDoubleClick={false}
                nodesDraggable={false}
                nodesConnectable={false}
                onConnect={onConnect}
            >
                <Background variant={BackgroundVariant.Dots}/>
            </ReactFlow>
        </div>
    );
}

