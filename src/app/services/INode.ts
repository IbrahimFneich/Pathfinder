export interface INode{
    col:number;
    row:number;
    isStart:boolean;
    isFinish: boolean;
    isPath:boolean;
    distance: number;
    isVisited: boolean;
    isWall: boolean;
    previousNode: Node;
}