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
  TIME:number=0.5;
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
    var isVisitedAndNotWall = this.matrix[this.i][this.j].isVisited && !this.matrix[this.i][this.j].isWall;
    if(this.i == row && this.j == col && isVisitedAndNotWall && !isStartOrFinish ){
      //setTimeout(() => {
        this.nodeClass="node";
      //}, 0.5 * CloudService.index++);
    }

  }

  clearPath(row:number,col:number){
    var isStartOrFinish = (this.matrix[row][col].isStart || this.matrix[row][col].isFinish);
    var isPath = this.matrix[this.i][this.j].isPath ;
    if(this.i == row && this.j == col && isPath && !isStartOrFinish ){
      //setTimeout(() => {
        this.nodeClass="node";
      //}, 0.5 * CloudService.index++);
    }

  }

  isDown:boolean=false;


  //---------------------------------------------------------------------------------------
  // MOUSE EVENT HANDLERS

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
          this.nodeClass="node ";
        }
        else{
          this.matrix[this.i][this.j].isWall=true;
          this.matrix[this.i][this.j].isPath=false;
          this.cloudService.updateMatrix(this.matrix);
          this.nodeClass="node node-wall";
        }
        
        CloudService.sameNode=this.matrix[this.i][this.j];

      }
      else{
        CloudService.startDragged=true;
      }

  }

  mouseOver(){
    console.log("over : "+CloudService.clicked);
    var isStartOrFinish = (this.matrix[this.i][this.j].isStart || this.matrix[this.i][this.j].isFinish);
    var isWall = this.matrix[this.i][this.j].isWall;

    if(CloudService.startDragged) {
      CloudService.startRow=this.i;
      CloudService.startCol=this.j;
      
    }

    else if(CloudService.clicked ){
      var sameNode = (CloudService.sameNode.row == this.matrix[this.i][this.j].row) &&
      (CloudService.sameNode.col == this.matrix[this.i][this.j].col);
      if(!isStartOrFinish ){
        if (!sameNode) {
          if(isWall){
            this.matrix[this.i][this.j].isWall=false;
            this.matrix[this.i][this.j].isPath=false;
            this.cloudService.updateMatrix(this.matrix);
            this.nodeClass="node ";
          }
          else{
            this.matrix[this.i][this.j].isWall=true;
            this.matrix[this.i][this.j].isPath=false;
            this.cloudService.updateMatrix(this.matrix);
            this.nodeClass="node node-wall";
          }
        }
        
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
        this.nodeClass="node node-wall";
      }
      if(CloudService.startDragged){
        console.log("HEREEEEE");
        
        CloudService.startRow=this.i;
        CloudService.startCol=this.j;
        this.matrix[CloudService.startRow][CloudService.startCol].isStart=true;
        this.cloudService.updateMatrix(this.matrix);
        CloudService.startDragged=false;
      }
      CloudService.clicked=false;
      
  }



}
