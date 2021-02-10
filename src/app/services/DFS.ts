import { table } from "console";
import { start } from "repl";
import { INode } from "./INode";

export function DFS(matrix:INode[][], startNode:INode,finishNode:INode){
    var stack:INode[]=[];
    var path:INode[]=[];

    startNode.distance=0;
    stack.push(startNode);

    
    while(stack.length!=0){
        var poped:INode = stack.pop();
        console.log(poped);
        poped.isPath=true;
        poped.isVisited=true;
        path.push(poped);
        
        if(poped.isFinish) break;
        
        var next:INode ;

        var isRoof:boolean = poped.row==0; 
        var isRightBorder:boolean = poped.col==69; 
        var isFloor:boolean = poped.row==24; 
        var isLeftBorder:boolean = poped.col==0; 
        
            
            
            // var upIsVisited:boolean = matrix[poped.row-1][poped.col].isVisited; 
            // var rightIsVisited:boolean = matrix[poped.row][poped.col+1].isVisited; 
            // var downIsVisited:boolean = matrix[poped.row+1][poped.col].isVisited; 
            // var leftIsVisited:boolean = matrix[poped.row][poped.col-1].isVisited;


     
        if(!isLeftBorder){
            var leftIsVisited:boolean = matrix[poped.row][poped.col-1].isVisited;

            var leftIsWall:boolean=matrix[poped.row][poped.col-1].isWall;

            
            if(!leftIsVisited && !leftIsWall){
                //go left
                next = matrix[poped.row][poped.col-1];
                
                //next.isVisited=true;
                stack.push(next);
            }
        }
       

        
        if(!isFloor){
            var downIsVisited:boolean = matrix[poped.row+1][poped.col].isVisited;

            var downIsWall:boolean=matrix[poped.row+1][poped.col].isWall;

            
            if(!downIsVisited && !downIsWall){
                //go down
                next = matrix[poped.row+1][poped.col];
                
                //next.isVisited=true;
                stack.push(next);
            }
        }
    
        if(!isRightBorder){
            var rightIsVisited:boolean = matrix[poped.row][poped.col+1].isVisited;
            
            var rightIsWall:boolean=matrix[poped.row][poped.col+1].isWall;

            
            if(!rightIsVisited && !rightIsWall){
                //go right
                next = matrix[poped.row][poped.col+1];
                
                //next.isVisited=true;
                stack.push(next);
            }
        }
        
        if(!isRoof){
            var upIsVisited:boolean = matrix[poped.row-1][poped.col].isVisited;

            var upIsWall:boolean=matrix[poped.row-1][poped.col].isWall;


            if(!upIsVisited && !upIsWall){
                //go up
                next = matrix[poped.row-1][poped.col];
                
                //next.isVisited=true;
                stack.push(next);
                console.log('EYYYY');
            }
        }
        


        
    }

    return path;

}