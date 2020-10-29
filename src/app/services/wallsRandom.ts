import { INode } from './INode';


export function wallsRandom(grid, startNode, finishNode){
    
    const walls:INode[]=[];
    //top row
    for (let index = 0; index < 70; index++) {
        let node:INode = grid[0][index];
        node.isWall=true;
        walls.push(node);
    }

    //right col
    for (let index = 0; index < 25; index++) {
        let node:INode = grid[index][69];
        node.isWall=true;
        walls.push(node);
    }

    //bottom row
    for (let index = 69; index >= 0; index--) {
        let node:INode = grid[24][index];
        node.isWall=true;
        walls.push(node);
    }

    //left col
    for (let index = 24; index >= 0; index--) {
        let node:INode = grid[index][0];
        node.isWall=true;
        walls.push(node);
    }

    //cols
    for (let index = 2; index < 35; index+=2) {

            let window = Math.floor(Math.random() * 23) + 1;
            for (let j = 1; j < 24; j++) {
                let node:INode = grid[j][index];    

                if(j!=window){
                    node.isWall=true;
                }else{
                    node.isWall=false;
                }
                 walls.push(node);
                
            }
        
    }
    
    //cols
    for (let index = 68; index >= 35; index-=2) {
            let window = Math.floor(Math.random() * 23) + 1;
            for (let j = 1; j < 24; j++) {
                let node:INode = grid[j][index];    

                if(j!=window){
                    node.isWall=true;
                }else{
                    node.isWall=false;
                }
                 walls.push(node);
                
            }
        
    }





    return walls;
}