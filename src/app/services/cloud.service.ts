import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { INode } from './INode';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  private matrixSource = new BehaviorSubject<INode[][]>(this.InitializeMatrix());
  currentMatrix = this.matrixSource.asObservable();

  static index:number = 1;
  static visitedPath:INode[]=null;
  constructor() { 

  }

  updateMatrix(matrix:INode[][]){
    this.matrixSource.next(matrix);
    
  }

  InitializeMatrix():INode[][]{

          
    const matrix = [];
    for (let row = 0; row < 15; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        if(row==8 && col == 8){
          const startNode:INode={
            row:8,
            col:8,
            distance:0,
            isStart:true,
            isFinish:false,
            isPath:false,
            isWall:false,
            isVisited:false,
            previousNode:null,
          };

          currentRow.push(startNode);
        }
        else if(row==8 && col == 42){

          const finishNode:INode={
            row:8,
            col:42,
            distance:Number.MAX_VALUE,
            isStart:false,
            isFinish:true,
            isPath:false,
            isWall:false,
            isVisited:false,
            previousNode:null,
          };
          currentRow.push(finishNode);
        }
        else{
        const node:INode={
          row:row,
          col:col,
          distance:Number.MAX_VALUE,
          isStart:false,
          isFinish:false,
          isPath:false,
          isWall:false,
          isVisited:false,
          previousNode:null,
        };
        currentRow.push(node);
        }      
      }

      matrix.push(currentRow);

    }

    return matrix;


    

  }

}
