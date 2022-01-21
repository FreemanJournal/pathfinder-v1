import React from 'react';
import "./node.css"

export default function Node({isStart,isFinish,isVisited,nodeIndex}) {
    const extractClass = isFinish?"node-finish":isStart?"node-start":isVisited?"node-visited":""
  return <>
    <td className={`nodeBox ${extractClass}`}></td>
  </>;
}

export const DEFAULT_NODE = {
    row:0,
    col:0
};