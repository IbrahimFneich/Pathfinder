//return walls in an array 

import { INode } from './INode';
import { dijkstra, getNodesInShortestPathOrder } from '../services/dijkstra';


export function basicRandom(grid, startNode, finishNode){
    let index = 0;
    

        const randomWalls:INode[]=[];
        while (index<500) {
            let randomRow = Math.floor(Math.random() * 25) + 0;  
            let randomCol = Math.floor(Math.random() * 70) + 0;


            let node:INode = grid[randomRow][randomCol];
                grid[randomRow][randomCol].isWall=true;
                node.isWall=true;
                randomWalls.push(node);
                //grid[randomRow][randomCol].isWall=true;
                index++;

                //console.log("("+randomRow+","+randomCol+")="+isInPath);
        }
        index=0;
        // let dij = dijkstra(grid,startNode,finishNode);
        // let path = getNodesInShortestPathOrder(finishNode);
        
        
            return randomWalls;
    
    


    

}