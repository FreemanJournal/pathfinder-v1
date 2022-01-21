import React, { useEffect, useState } from 'react'

import dijkstra from '../algorithms/dijkstra';


import Node from '../node/Node'
import './pathfinder.css'


const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const createNode = (col, row) => {
    return {
        row, col,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
}
const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row))
        }

        grid.push(currentRow)
    }

    return grid;
}

export default function Pathfinder() {
    const [grid, setGrid] = useState([])

    useEffect(() => setGrid(getInitialGrid), []);

    const animateDijkstra = (visitedNodesInOrder) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            setTimeout(function () {
                const node = visitedNodesInOrder[i];
         
                const newGrid = grid.slice();
                const newNode = {
                    ...node,
                    isVisited: true,
                };
                newGrid[node.row][node.col] = newNode;
                // console.log(newGrid);
                setGrid(newGrid)

            }, i * 1000);
            break

        }


    }
    const visualizeDijkstra = () => {
        const startNode = grid[START_NODE_ROW][START_NODE_COL]
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)
        animateDijkstra(visitedNodesInOrder);
    }

    return (
        <>
            <button onClick={() => visualizeDijkstra()}>Visualize Dijkstra's Algorithm</button>
            <table className="nodeGrid">
                <tbody>
                    {grid.map((row, rowIndex) => {

                        return (
                            <tr className="" key={rowIndex}>
                                {row.map((node, nodeIndex) => {
                                    const { isStart, isFinish, isVisited } = node
                                    return <Node key={nodeIndex} isStart={isStart} isFinish={isFinish} isVisited={isVisited} nodeIndex={nodeIndex} />
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
