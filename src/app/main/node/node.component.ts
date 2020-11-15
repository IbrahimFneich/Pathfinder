import { Component, OnInit,Input,OnChanges, SimpleChanges } from '@angular/core';
import { CloudService } from 'src/app/services/cloud.service';
import { INode } from 'src/app/services/INode';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit ,OnChanges{

  nodeClass:string='node';
  TIME:number=1;
  matrix:INode[][];

  @Input() i:number;
  @Input() j:number;
  @Input() animatePath:boolean;

  

  constructor(private cloudService:CloudService) { 
    
  }


  ngOnInit(): void {
    this.cloudService.currentMatrix.subscribe((matrix: INode[][])=> this.matrix = matrix);
    
    if(this.matrix[this.i][this.j].isStart){
      this.nodeClass="node node-start";
    }
    if(this.matrix[this.i][this.j].isFinish){
      this.nodeClass="node node-finish";
    }
    //console.log(this.changed);

    
    
    
    
  }

  ngOnChanges(changes: SimpleChanges): void {


    

  }

  onClick(){


      //console.log('('+this.i+','+this.j+')');
      console.log(this.matrix[this.i][this.j]);
      


  }


  child(row:number,col:number){
    var isStartOrFinish = (this.matrix[row][col].isStart || this.matrix[row][col].isFinish);
    if(this.i == row && this.j == col && !isStartOrFinish){
      //console.log(row+','+col);
      setTimeout(() => {
        this.nodeClass="node node-visited";
      }, this.TIME * CloudService.index++);
    }

    
  }

  path(row:number,col:number){
    var isStartOrFinish = (this.matrix[row][col].isStart || this.matrix[row][col].isFinish);

    if(this.i == row && this.j == col && this.matrix[this.i][this.j].isPath && !isStartOrFinish ){
      setTimeout(() => {
        this.nodeClass="node node-path";
      }, this.TIME * CloudService.index++);
       
    }
    if(this.matrix[row][col].isFinish){
      setTimeout(() => {
        CloudService.isDone=true;
        console.log("GERER");
        
      }, this.TIME * CloudService.index++);
      
    } 
    

  }

  walls(row:number,col:number){
    var isStartOrFinish = (this.matrix[row][col].isStart || this.matrix[row][col].isFinish);

    if(this.i == row && this.j == col && this.matrix[this.i][this.j].isWall && !isStartOrFinish ){
      setTimeout(() => {
        this.nodeClass="node node-wall";
      }, this.TIME * CloudService.index++);
    }

  }

  clearWalls(row:number,col:number){
    var isStartOrFinish = (this.matrix[row][col].isStart || this.matrix[row][col].isFinish);

    if(this.i == row && this.j == col && this.matrix[this.i][this.j].isWall && !isStartOrFinish ){
      //setTimeout(() => {
        this.nodeClass="node";
      //}, 0.5 * CloudService.index++);
    }

  }

  clearVisited(row:number,col:number){
    var isStartOrFinish = (this.matrix[row][col].isStart || this.matrix[row][col].isFinish);
    var isWall = this.matrix[this.i][this.j].isWall

    if(this.i == row && this.j == col &&  !isStartOrFinish ){
      //setTimeout(() => {
        this.nodeClass="node";
      //}, 0.5 * CloudService.index++);
    }
  }


  isDown:boolean=false;


  //---------------------------------------------------------------------------------------
  // MOUSE EVENTS

  mouseDown(){
    console.log("down");
    
    var isStartOrFinish = (this.matrix[this.i][this.j].isStart || this.matrix[this.i][this.j].isFinish);
    var isWall = this.matrix[this.i][this.j].isWall;

    
    
    if(!isStartOrFinish && !CloudService.isRunning){
      CloudService.clicked=true;
        if(isWall){
          this.matrix[this.i][this.j].isWall=false;
          this.matrix[this.i][this.j].isPath=false;
          this.cloudService.updateMatrix(this.matrix);
          this.cloudService.currentMatrix.subscribe((matrix: INode[][])=> this.matrix = matrix);
          this.nodeClass="node ";
        }
        else{
          this.matrix[this.i][this.j].isWall=true;
          this.matrix[this.i][this.j].isPath=false;
          this.cloudService.updateMatrix(this.matrix);
          this.cloudService.currentMatrix.subscribe((matrix: INode[][])=> this.matrix = matrix);
          this.nodeClass="node node-wall";
        }
        
        CloudService.sameNode=this.matrix[this.i][this.j];

      }
    //if start or finish is dragged
    else{

        this.previousNode=null;

        //if start is dragged
        if(this.matrix[this.i][this.j].isStart && !CloudService.isRunning){
          this.previousNode=this.matrix[this.i][this.j];

          this.nodeClass="node";
          this.matrix[this.i][this.j].isStart=false;
          this.matrix[this.i][this.j].distance=Number.MAX_VALUE;
          console.log("dragging : ");
          console.log(this.matrix[this.i][this.j]);
        
          
          this.cloudService.updateMatrix(this.matrix);
          this.cloudService.currentMatrix.subscribe((matrix: INode[][])=> this.matrix = matrix);
          CloudService.startDragged=true;
        }

        //if finish is dragged
        if(this.matrix[this.i][this.j].isFinish && !CloudService.isRunning){
          this.nodeClass="node";
          this.matrix[this.i][this.j].isFinish=false;
          this.matrix[this.i][this.j].distance=Number.MAX_VALUE;
          this.matrix[this.i][this.j].isVisited=false;

          console.log("dragging : ");
          console.log(this.matrix[this.i][this.j]);
        
          
          this.cloudService.updateMatrix(this.matrix);
          this.cloudService.currentMatrix.subscribe((matrix: INode[][])=> this.matrix = matrix);
          CloudService.finishDragged=true;
        }

    }

  }

  previousNode:INode;

  mouseOver(){
    console.log("over : "+CloudService.clicked);
    var isStartOrFinish = (this.matrix[this.i][this.j].isStart || this.matrix[this.i][this.j].isFinish);
    var isWall = this.matrix[this.i][this.j].isWall;

    //if start is dragged
    if(CloudService.startDragged) {
      if(!this.matrix[this.i][this.j].isFinish){
        CloudService.startRow=this.i;
        CloudService.startCol=this.j;
        
        this.matrix[this.i][this.j].isStart=true;
        this.matrix[this.i][this.j].distance=Number.MAX_VALUE;
  
        this.cloudService.updateMatrix(this.matrix);
        this.cloudService.currentMatrix.subscribe((matrix: INode[][])=> this.matrix = matrix);
        this.nodeClass="node node-start node-dragged";
      }
      

    }

    //if finish is dragged
    if(CloudService.finishDragged) {
      if(!this.matrix[this.i][this.j].isStart){
        CloudService.finishRow=this.i;
        CloudService.finishCol=this.j;
        
        this.matrix[this.i][this.j].isFinish=true;
        this.matrix[this.i][this.j].distance=Number.MAX_VALUE;
        this.matrix[this.i][this.j].isVisited=false;
  
        this.cloudService.updateMatrix(this.matrix);
        this.cloudService.currentMatrix.subscribe((matrix: INode[][])=> this.matrix = matrix);
        this.nodeClass="node node-finish node-dragged";
      }



    }

    else if(CloudService.clicked && !CloudService.isRunning){
      var sameNode = (CloudService.sameNode.row == this.matrix[this.i][this.j].row) &&
      (CloudService.sameNode.col == this.matrix[this.i][this.j].col);
      if(!isStartOrFinish ){
        if (!sameNode) {
          if(isWall){
            this.matrix[this.i][this.j].isWall=false;
            this.matrix[this.i][this.j].isPath=false;
            this.cloudService.updateMatrix(this.matrix);
            this.cloudService.currentMatrix.subscribe((matrix: INode[][])=> this.matrix = matrix);
            this.nodeClass="node ";
          }
          else{
            this.matrix[this.i][this.j].isWall=true;
            this.matrix[this.i][this.j].isPath=false;
            this.cloudService.updateMatrix(this.matrix);
            this.cloudService.currentMatrix.subscribe((matrix: INode[][])=> this.matrix = matrix);
            this.nodeClass="node node-wall";
          }
        }
        
      }

    }
    
  }

  mouseOut(){
    if(CloudService.startDragged ){
      if(!this.matrix[this.i][this.j].isFinish){
        this.matrix[this.i][this.j].isStart=false;
        this.matrix[this.i][this.j].isFinish=false;
        this.matrix[this.i][this.j].isVisited=false;
        this.matrix[this.i][this.j].isWall=false;
        this.matrix[this.i][this.j].distance=Number.MAX_VALUE;
        this.cloudService.updateMatrix(this.matrix);
        this.cloudService.currentMatrix.subscribe((matrix: INode[][])=> this.matrix = matrix);
        this.nodeClass="node";
      }
    }

    if(CloudService.finishDragged ){
      if(!this.matrix[this.i][this.j].isStart){
        this.matrix[this.i][this.j].isStart=false;
        this.matrix[this.i][this.j].isFinish=false;
        this.matrix[this.i][this.j].isVisited=false;
        this.matrix[this.i][this.j].isWall=false;
        this.matrix[this.i][this.j].distance=Number.MAX_VALUE;
        this.cloudService.updateMatrix(this.matrix);
        this.cloudService.currentMatrix.subscribe((matrix: INode[][])=> this.matrix = matrix);
        this.nodeClass="node";
      }
    }
  }

  mouseUp(){
      console.log("up");
      var isStartOrFinish = (this.matrix[this.i][this.j].isStart || this.matrix[this.i][this.j].isFinish);
      
      if(!isStartOrFinish && !CloudService.isRunning){
        this.matrix[this.i][this.j].isWall=true;
        this.matrix[this.i][this.j].isPath=false;
        this.cloudService.updateMatrix(this.matrix);
        this.cloudService.currentMatrix.subscribe((matrix: INode[][])=> this.matrix = matrix);
        this.nodeClass="node node-wall";
      }

      //start is dropped
      if(CloudService.startDragged){

        console.log("HEREEEEE");
        
        CloudService.startRow=this.i;
        CloudService.startCol=this.j;
        this.matrix[this.i][this.j].isStart=true;
        this.matrix[this.i][this.j].isFinish=false;
        
        this.matrix[this.i][this.j].isWall=false;
        this.matrix[this.i][this.j].distance=0;
        this.matrix[CloudService.startRow][CloudService.startCol].isStart=true;
        this.cloudService.updateMatrix(this.matrix);
        this.cloudService.currentMatrix.subscribe((matrix: INode[][])=> this.matrix = matrix);
        CloudService.startDragged=false;
        this.nodeClass="node node-start"
        console.log("Arrived : ");
        console.log(this.matrix[this.i][this.j]);
      }

      //finish is dropped
      if(CloudService.finishDragged){
        console.log("HEREEEEE");
        
        CloudService.finishRow=this.i;
        CloudService.finishCol=this.j;

        this.matrix[this.i][this.j].isFinish=true;
        this.matrix[this.i][this.j].isStart=false;
        this.matrix[this.i][this.j].isWall=false;
        this.matrix[this.i][this.j].isVisited=false;
        this.matrix[this.i][this.j].distance=Number.MAX_VALUE;

        this.matrix[CloudService.finishRow][CloudService.finishCol].isFinish=true;

        this.cloudService.updateMatrix(this.matrix);
        this.cloudService.currentMatrix.subscribe((matrix: INode[][])=> this.matrix = matrix);
        CloudService.finishDragged=false;
        this.nodeClass="node node-finish"
        console.log("Arrived : ");
        console.log(this.matrix[this.i][this.j]);
      }

      CloudService.clicked=false;
      
  }



}
