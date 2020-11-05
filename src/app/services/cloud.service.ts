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
  static clicked:boolean=false;
  static isDone:boolean=false;
  static sameNode:INode;
  static startDragged:boolean=false;
  static isPathFound:boolean=false;

  static isRunning:boolean=false;

  static startRow:number=13;
  static startCol:number=15;

  static finishRow:number=13;
  static finishCol:number=55;
  
  constructor() { 

  }

  updateMatrix(matrix:INode[][]){
    this.matrixSource.next(matrix);
  }

  InitializeMatrix():INode[][]{

          
    const matrix = [];
    for (let row = 0; row < 25; row++) {
      const currentRow = [];
      for (let col = 0; col < 70; col++) {
        if(row==13 && col == 15){
          const startNode:INode={
            row:CloudService.startRow,
            col:CloudService.startCol,
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
        else if(row==13 && col == 55){

          const finishNode:INode={
            row:CloudService.finishRow,
            col:CloudService.finishCol,
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
