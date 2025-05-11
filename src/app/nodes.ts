import {useCallback} from 'react';
import ReactFlow, {addEdge, Background, type Edge, type Node, Position, useEdgesState, useNodesState,} from 'reactflow';
import 'reactflow/dist/style.css';
// function createNode(id: string, x: number, y: number, label:string|number, type:string) {
//
//     return {
//         id,
//         position: {x, y},
//         data: {label},
//         style: {
//             borderRadius: '1000px',
//             width: '35px',
//             height: '35px'
//         },
//         targetPosition: Position.Left,
//         sourcePosition: Position.Right,
//         type
//     }
// }
//
// const w = 3, h = 1.5;
//
// const initialNodes: Node[] = [
//     createNode('l1n1', 10 * w, 20 * h, 1,  "default"),
//     createNode('l1n2', 10 * w, 60 * h, 2, "placeholderNode"),
//     createNode('l1n3', 10 * w, 100 * h, 3, "placeholderNode"),
//     createNode('l1n4', 10 * w, 140 * h, 4, "placeholderNode"),
//     createNode('l1n5', 10 * w, 180 * h, 5, "placeholderNode"),
//     createNode('l1n6', 10 * w, 220 * h, 6, "placeholderNode"),
//     createNode('l1n7', 10 * w, 260 * h, 7,"placeholderNode"),
//
//     createNode('l2n1', 80 * w, 5 * h, "A",  "default"),
//     createNode('l2n2', 80 * w, 43 * h, "B", "placeholderNode"),
//     createNode('l2n3', 80 * w, 81 * h, "C", "placeholderNode"),
//     createNode('l2n4', 80 * w, 119 * h, "D", "placeholderNode"),
//     createNode('l2n5', 80 * w, 157 * h, "E", "placeholderNode"),
//     createNode('l2n6', 80 * w, 195 * h, "F", "placeholderNode"),
//     createNode('l2n7', 80 * w, 233 * h, "G", "placeholderNode"),
//     createNode('l2n8', 80 * w, 271 * h, "H", "placeholderNode"),
//
//     createNode('l3n1', 130 * w, 5 * h, "x",  "default"),
//     createNode('l3n2', 130 * w, 43 * h, "y", "placeholderNode"),
//     createNode('l3n3', 130 * w, 81 * h, "z", "placeholderNode"),
//     createNode('l3n4', 130 * w, 119 * h, "h", "placeholderNode"),
//     createNode('l3n5', 130 * w, 157 * h, "t", "placeholderNode"),
//     createNode('l3n6', 130 * w, 195 * h, "v", "placeholderNode"),
//     createNode('l3n7', 130 * w, 233 * h, "W", "placeholderNode"),
//     createNode('l3n8', 130 * w, 271 * h, "q", "placeholderNode")
// ];

export const initialNodes = [
    {
        id: "l1n1",
        label: 1 ,
        position: { x: 30, y: 30 },
        type: "default",
    },
    {
        id: "l1n2",
        data: { label: 2 },
        position: { x: 30, y: 90 },
        type: "placeholderNode",
    },
    {
        id: "l1n3",
        data: { label: 3 },
        position: { x: 30, y: 150 },
        type: "placeholderNode",
    },
    {
        id: "l1n4",
        data: { label: 4 },
        position: { x: 30, y: 210 },
        type: "placeholderNode",
    },
    {
        id: "l1n5",
        data: { label: 5 },
        position: { x: 30, y: 270 },
        type: "placeholderNode",
    },
    {
        id: "l1n6",
        data: { label: 6 },
        position: { x: 30, y: 330 },
        type: "placeholderNode",
    },
    {
        id: "l1n7",
        data: { label: 7 },
        position: { x: 30, y: 390 },
        type: "placeholderNode",
    },



    {
        id: "l2n1",
        data: { label: "a" },
        position: { x: 240, y: 6.5 },
        type: "default",
    },
    {
        id: "l2n2",
        data: { label: "b" },
        position: { x: 240, y: 64.5 },
        type: "placeholderNode",
    },
    {
        id: "l2n3",
        data: { label: "c" },
        position: { x: 240, y: 82.5 },
        type: "placeholderNode",
    },
    {
        id: "l2n4",
        data: { label: "d" },
        position: { x: 240, y: 178.5 },
        type: "placeholderNode",
    },
    {
        id: "l2n5",
        data: { label: "e" },
        position: { x: 240, y: 235.5 },
        type: "placeholderNode",
    },
    {
        id: "l2n6",
        data: { label: "f" },
        position: { x: 240, y: 292.5 },
        type: "placeholderNode",
    },
    {
        id: "l2n7",
        data: { label: "g" },
        position: { x: 240, y: 349.5 },
        type: "placeholderNode",
    },
    {
        id: "l2n8",
        data: { label: "h" },
        position: { x: 240, y: 406.5 },
        type: "placeholderNode",
    },



    {
        id: "l3n1",
        data: { label: "A" },
        position: { x: 390, y: 6.5 },
        type: "default",
    },
    {
        id: "l3n2",
        data: { label: "B" },
        position: { x: 390, y: 64.5 },
        type: "placeholderNode",
    },
    {
        id: "l3n3",
        data: { label: "C" },
        position: { x: 390, y: 82.5 },
        type: "placeholderNode",
    },
    {
        id: "l3n4",
        data: { label: "D" },
        position: { x: 390, y: 178.5 },
        type: "placeholderNode",
    },
    {
        id: "l3n5",
        data: { label: "E" },
        position: { x: 390, y: 235.5 },
        type: "placeholderNode",
    },
    {
        id: "l3n6",
        data: { label: "F" },
        position: { x: 390, y: 292.5 },
        type: "placeholderNode",
    },
    {
        id: "l3n7",
        data: { label: "G" },
        position: { x: 390, y: 349.5 },
        type: "placeholderNode",
    },
    {
        id: "l3n8",
        data: { label: "H" },
        position: { x: 390, y: 406.5 },
        type: "placeholderNode",
    }
];
